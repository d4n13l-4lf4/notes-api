import { Module } from '@nestjs/common';
import JwtStrategy from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt'})],
  providers: [JwtStrategy],
  exports: [PassportModule]
})
export class Auth0Module {}
