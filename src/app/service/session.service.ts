import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

import { Password, Session } from "./../class/chat";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  login(account: Password): void {
    this.afAuth
      .signInWithEmailAndPassword(account.email, account.password)
      .then(auth => {
        // メールアドレス確認が済んでいるかどうか
        if (!auth.user.emailVerified) {
          this.afAuth.signOut();
          return Promise.reject('メールアドレスが確認できていません。')
        } else {
          this.session.login = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('ログインしました。'))
      .catch( err => {
        console.log(err);
        alert('ログインに失敗しました。\n' + err);
      })
  }

  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        return this.router.navigate(['/account/login']);
      }).then(() => alert('ログアウトしました。'))
      .catch( err => {
        console.log(err);
        alert('ログアウトに失敗しました。\n' + err);
      });
  }

  // アカウント作成
  signup(account: Password): void {
    this.afAuth
      .createUserWithEmailAndPassword(account.email, account.password) // アカウント作成
      .then(auth => auth.user.sendEmailVerification()) // メールアドレス確認
      .then(() => alert('メールアドレス確認メールを送信しました。'))
      .catch(err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。 \n + err');
      });
  }
}
