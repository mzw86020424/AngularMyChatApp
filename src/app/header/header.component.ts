import { Component, OnInit } from '@angular/core';
import { Session } from "./../class/chat";

import { SessionService } from "../service/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public login: false;

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.sessionState.subscribe((session: Session) => {
      if (session) {
        this.login = session.login;
      }
    });
    // this.login = this.sessionService.session.login;
    // console.log('header-component-login:'+ this.login);
  }
  logout(): void {
    this.sessionService.logout;
  }

}
