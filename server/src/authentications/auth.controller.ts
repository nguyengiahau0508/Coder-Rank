
import {
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthProviders} from 'src/common/enums/authentication/auth.enum';
import {ApiCookieAuth, ApiOAuth2} from '@nestjs/swagger';
import {Response, Request} from 'express';
import {User} from 'src/modules/mariadb/users/entities/user.entity';
import {Role} from 'src/common/enums/authentication/role.enum';
import {ApplicaitionConfigurationService} from 'src/configurations/application/configuration.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly appConfigService: ApplicaitionConfigurationService
	) {}

	// Utility method to set authentication cookies
	private setAuthCookies(res: Response, tokens: {accessToken: string; refreshToken: string}) {
		res.cookie('accessToken', tokens.accessToken, {
			// httpOnly: true,
			// secure: true,
			// sameSite: 'strict',
			maxAge: 60 * 60 * 1000, // 1 hour
		});

		res.cookie('refreshToken', tokens.refreshToken, {
			// httpOnly: true,
			// secure: true,
			// sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});
	}

	@ApiOAuth2([])
	@Get(`${AuthProviders.Google}`)
	@UseGuards(AuthGuard(AuthProviders.Google))
	async authenticateWithGoogle() {
		// Redirect to Google's OAuth flow
	}

	@Get(`${AuthProviders.Google}/callback`)
	@UseGuards(AuthGuard(AuthProviders.Google))
	async googleCallback(@Req() req: any, @Res() res: Response) {
		if (!req.user) {
			return res.status(400).json({message: 'Không tìm thấy thông tin người dùng'});
		}

		try {
			const tokens = await this.authService.handleOAuthLogin(req, AuthProviders.Google);
			this.setAuthCookies(res, tokens);

			const userRole = await this.authService.getRole(req.user.email)
			if (userRole == Role.Admin) return res.redirect('http://localhost:5000/dashboard');
			return res.redirect('http://localhost:4200/callback');
		} catch (err) {
			console.error('OAuth callback error:', err);
			return res.status(500).json({message: 'Xảy ra lỗi trong quá trình xác thực'});
		}
	}

	@Get(`${AuthProviders.Github}`)
	@UseGuards(AuthGuard(AuthProviders.Github))
	async authenticateWithGithub() {
		// Redirect to GitHub's OAuth flow
	}

	@Get(`${AuthProviders.Github}/callback`)
	@UseGuards(AuthGuard(AuthProviders.Github))
	async githubCallback(@Req() req: Request, @Res() res: Response) {
		if (!req.user) {
			return res.status(400).json({message: 'Không tìm thấy thông tin người dùng'});
		}

		try {
			const tokens = await this.authService.handleOAuthLogin(req, AuthProviders.Github);
			this.setAuthCookies(res, tokens);
			return res.redirect(`${this.appConfigService.student_url}/callback`);
		} catch (err) {
			console.error('OAuth callback error:', err);
			return res.status(500).json({message: 'Xảy ra lỗi trong quá trình xác thực'});
		}
	}

	@Post(`${AuthProviders.Local}/login`)
	@UseGuards(AuthGuard(AuthProviders.Local))
	async login(@Req() req: Request, @Res() res: Response) {
		if (!req.user) {
			return res.status(400).json({message: 'Không tìm thấy thông tin người dùng'});
		}

		try {
			const tokens = await this.authService.generateLoginResponse(req.user as User, req.ip);
			this.setAuthCookies(res, tokens);
			return res.redirect('http://localhost:4200/callback');
		} catch (err) {
			console.error('Login error:', err);
			return res.status(500).json({message: 'Xảy ra lỗi trong quá trình xác thực'});
		}
	}

	@UseGuards(AuthGuard(AuthProviders.Jwt))
	@Post(`${AuthProviders.Local}/logout`)
	async logout(@Req() req: any, @Res() res: Response) {
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');

		const message = await this.authService.logout(req);
		res.status(200).json({message});
	}

	@Post('refresh-token')
	async refreshToken(@Req() req: Request, @Res() res: Response) {
		const refreshToken = req.cookies?.['refreshToken'];
		if (!refreshToken) {
			throw new UnauthorizedException('Refresh token not found');
		}

		try {
			const tokens = await this.authService.refreshToken(req, refreshToken);
			this.setAuthCookies(res, tokens);
			return res.status(200).json({message: 'Token refreshed successfully', data: req.user});
		} catch (err) {
			console.error('Refresh token error:', err);
			return res.status(500).json({message: 'Xảy ra lỗi trong quá trình làm mới token'});
		}
	}

	@ApiCookieAuth()
	@UseGuards(AuthGuard(AuthProviders.Jwt))
	@Get('profile')
	getProfile(@Req() req: any) {
		return {data: req.user.user};
	}

	@Get('check-auth')
	@UseGuards(AuthGuard(AuthProviders.Jwt))
	async checkAuth(@Req() req: Request, @Res() res: Response) {
		return {
			data: {
				authenticated: true
			}
		}
	}
}

