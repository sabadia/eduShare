import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  title = 'EduShare';
  ngOnInit() {
    this.userService.autoAuthUser();
  }
}
