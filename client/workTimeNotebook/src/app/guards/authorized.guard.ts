import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { _JWT_KEY } from '../modules/auth/utils/constsnts';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const hasValidToken = this.authService.hasValidToken();
    if (hasValidToken) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
