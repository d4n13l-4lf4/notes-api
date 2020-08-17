import { config as dotenvConfig } from 'dotenv';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

dotenvConfig();

class JwtStrategy extends PassportStrategy(Strategy) {

  static readonly options: StrategyOptions = {
    secretOrKeyProvider: passportJwtSecret({
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5
    }),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256'],
  }

  constructor() {
    super(JwtStrategy.options);
  }

  validate(payload: any): any {
    return payload;
  }

}

export default JwtStrategy
