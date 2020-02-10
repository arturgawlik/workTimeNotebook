import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _backend_url, _register_controller_url, _register_method_url, _checkEmailNotTaken_method_url } from '../../utils/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterBackendService {

  constructor(private httpClient: HttpClient) {
  }

  register(email: string, password: string) {
    const url = _backend_url + _register_controller_url + _register_method_url;
    return this.httpClient.post<void>(url, { email, password });
  }

  checkEmailNotTaken(email: string): Observable<boolean> {
    const url = _backend_url + _register_controller_url + _checkEmailNotTaken_method_url + `?email=${email}`;
    return this.httpClient.get<boolean>(url);
  }
}
