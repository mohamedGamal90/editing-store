import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
// import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
     {
    const value = this.authService.value;
    if (value > 1) {
      return true;
    }
    return this.router.createUrlTree(['']);
  }
}

// | boolean
// | UrlTree
// | Observable<boolean | UrlTree>
// | Promise<boolean | UrlTree> {
//  const value = this.authService.value
//  if(value>1){
//    return true
//  }
//  return this.router.createUrlTree(['']);
// // return this.authService.loggedIn.pipe(
// //   map((response) => {
// //     if (response == true) {
// //       return true;
// //     }
// //     return this.router.createUrlTree(['']);
// //   })
// // );
// }
// }
