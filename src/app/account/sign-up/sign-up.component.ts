import { Component, OnInit } from '@angular/core';

import { Password } from "../../class/chat";
import { SessionService } from "../../service/session.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public account =new Password();

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  // アカウント作成
  submitSignUp(e: Event): void {
    e.preventDefault();
    // パスワード確認
    if (this.account.password !== this.account.passwordConfirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.session.signup(this.account);
    this.account.reset();
  }

}
