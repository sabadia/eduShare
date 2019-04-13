import { Router } from '@angular/router';
import { AppComponent } from './../app.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin: boolean;
  private userListenerSubs: Subscription;
  createRegistrationControl: FormGroup;
  search(search: string) {
    console.log(search);
  }
  logOut() {
    this.userService.logOut();
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userService.login(form.value.userName, form.value.password);
    this.router.navigate(['home']);
  }

  registration() {
    if (this.createRegistrationControl.invalid) {
      return;
    }
    this.userService.createUser(
      this.createRegistrationControl.value.userName,
      this.createRegistrationControl.value.email,
      this.createRegistrationControl.value.password
    );
    this.router.navigate(['home']);
  }

  constructor(
    public AppComp: AppComponent,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnDestroy() {
    this.userListenerSubs.unsubscribe();
  }
  ngOnInit() {
    this.isLogin = this.userService.isUserAuthenticated();
    this.userListenerSubs = this.userService
      .getUserStatusListener()
      .subscribe(isLogin => (this.isLogin = isLogin));
    this.createRegistrationControl = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
