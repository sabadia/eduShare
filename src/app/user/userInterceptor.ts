import { UserService } from './user.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const userToken = this.userService.getToken();
    const userRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + userToken)
    });
    return next.handle(userRequest);
  }
}
