import { config as dotenvConfig } from 'dotenv';
import { OAuthTokenResponse } from './OAuthTokenResponse';
import superagent from 'superagent';

dotenvConfig();

function authenticate(): Promise<OAuthTokenResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const authentication_url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
      const auth_data = {
        grant_type: 'password',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        username: process.env.AUTH0_EXAMPLE_USERNAME,
        password: process.env.AUTH0_EXAMPLE_PASSWORD
      };

      const { body } = await superagent
        .post(authentication_url)
        .send(auth_data);
      return resolve(body);
    } catch (e) {
      return reject(e);
    }
  });
}

export default authenticate;
