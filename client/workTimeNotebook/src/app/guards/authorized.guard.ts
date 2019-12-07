import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { _JWT_KEY } from '../utils/constsnts';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  
  constructor(private router: Router) {
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwt = window.localStorage.getItem(_JWT_KEY);
    if (jwt) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
