import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../service/session.service";

import { Subject } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginSubject: Subject<number> = new Subject();
  public loginState = this.loginSubject.asObservable();
  public count = 0;

  constructor(private SessionService: SessionService) { }

  ngOnInit() { }

  submitLogin() {
    this.SessionService.login();
  }

}
