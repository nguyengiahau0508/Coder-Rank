
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthConfigurationService } from 'src/configurations/authentications/jwt/configuration.service';
import { TokensService } from 'src/modules/mariadb/tokens/tokens.service';
import { IJwtPayload } from './interface';
import { AuthProviders } from 'src/common/enums/authentication/auth.enum';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthProviders.Jwt) {
  constructor(
    private readonly tokensService: TokensService,
    jwtAuthConfigurationService: JwtAuthConfigurationService,
  ) {
    super({
      // Sử dụng extractor để lấy token từ cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            return req.cookies['accessToken']; // Trích xuất token từ cookie với key là 'accessToken'
          }
          return null;
        },
      ]),
      ignoreExpiration: false, // Kiểm tra expiration của token
      secretOrKey: jwtAuthConfigurationService.secret, // Secret key để verify token
    });
  }

  async validate(payload: IJwtPayload) {
    const tokenInfo = await this.tokensService.findTokenByKey(payload.tokenKey);
    if (!tokenInfo || tokenInfo.isRevoked || tokenInfo.type === 'REFRESH_TOKEN') {
      throw new UnauthorizedException('Token Invalid');
    }
    return payload; // Trả về payload để dùng trong request.user
  }
}

