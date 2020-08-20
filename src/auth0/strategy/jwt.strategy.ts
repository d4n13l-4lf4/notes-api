import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { Inject } from '@nestjs/common';
import authenticationConfig from '../../config/authentication.config';
import { ConfigType } from '@nestjs/config';



class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@Inject(authenticationConfig.KEY)
              private readonly authConfig: ConfigType<typeof authenticationConfig>) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.audience,
      issuer: authConfig.issuer,
      algorithms: ['RS256'],
    });
  }

  validate(payload: any): any {
    return payload;
  }

}

export default JwtStrategy
