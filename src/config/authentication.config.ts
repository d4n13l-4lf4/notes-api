import { registerAs } from '@nestjs/config';

export default registerAs('authentication', () => ({
  client_id: process.env.AUTH0_CLIENT_ID,
  client_secret: process.env.AUTH0_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE
}));
