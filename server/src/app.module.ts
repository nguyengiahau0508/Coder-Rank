import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './providers/database/database.provider.module';
import { AuthModule } from './authentications/auth.module';
import { ApplicationConfigurationModule } from './configurations/application/configuration.module';
import { FeatureModule } from './modules/feature.module';
import { SeederModule } from './seed/seeder.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000, limit: 100
        }
      ]
    }),
    ApplicationConfigurationModule,
    DatabaseProviderModule,
    FeatureModule,
    AuthModule,
    SeederModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }]
})
export class AppModule { }
