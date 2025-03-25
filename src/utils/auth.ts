import Cookies from 'js-cookie';
import { getAuth } from 'firebase/auth';
import { jwtDecode } from 'jwt-decode';

export interface MyToken {
  scope: string;
  user: string;
  email: string;
  role: string;
  budget: string;
  iat: number;
  exp: number;
}

const auth = {
  token: () => Cookies.get('accessToken'),

  saveToken: (token: string) => {
    Cookies.set('accessToken', token);
  },

  getDecodedToken: () => {
    const token = Cookies.get('accessToken');
    if (!token) return null;
    try {
      return jwtDecode<MyToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  },

  isTokenExpired: () => {
    const decodedToken = auth.getDecodedToken();
    if (!decodedToken) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  },

  clearToken: () => {
    Cookies.remove('accessToken');
  },

  getFirebaseToken: async () => {
    const authInstance = getAuth();
    const user = authInstance.currentUser;

    if (!user) {
      console.warn('No user is signed in.');
      return null;
    }

    try {
      const token = await user.getIdToken(true); // Force refresh to get the latest token
      auth.saveToken(token); // Store token in cookies
      return token;
    } catch (error) {
      console.error('Error fetching Firebase token:', error);
      return null;
    }
  },
};

export default auth;
