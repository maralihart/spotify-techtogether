import {authorize, refresh} from 'react-native-app-auth';
import {spotifyCredentials} from './secrets.js';
import {AuthSession} from 'expo';



class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: spotifyCredentials.clientId,
      clientSecret: spotifyCredentials.clientSecret,
      redirectUrl: spotifyCredentials.redirectUrl,
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      console.log(this.spotifyAuthConfig);
      const result = await authorize(this.spotifyAuthConfig);
      return result;
    } catch (error) {
      console.log(error);
    } 
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }

}

const authHandler = new AuthenticationHandler();

export default authHandler;