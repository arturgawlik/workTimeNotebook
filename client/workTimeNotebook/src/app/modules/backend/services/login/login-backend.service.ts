import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _backend_url, _login_method_url, _login_controller_url } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LoginBackendService {

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    const url = _backend_url + _login_controller_url + _login_method_url;
    return this.httpClient.post<{ access_token: string }>(url, { username, password });
  }
  
}
