import { Injectable } from '@angular/core';
import { _JWT_KEY } from '../utils/constsnts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  setToken(token: string) {
    window.localStorage.setItem(_JWT_KEY, token);
  }

  getToken(): string {
    const jwt = window.localStorage.getItem(_JWT_KEY);

    return jwt;
  }

  hasValidToken(): boolean {
    const jwt = window.localStorage.getItem(_JWT_KEY);
    // TODO: check is token valid?
    
    return jwt !== null && jwt !== undefined;
  }

}
