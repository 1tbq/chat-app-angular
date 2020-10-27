import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { from } from 'rxjs';
//import { of } from 'rxjs';
import 'rxjs/add/observable/of';
//import { fromPromise } from 'rxjs/observable/fromPromise';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';

import { firebase } from '@firebase/app';

@Injectable()
export class AuthService {

  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;
  
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    // private fireDb: AngularFireDatabase
  ) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.currentUser = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
      this.setCurrentUserSnapshot();
  }
  
  public signup(
    email: string,
    password: string,
    firstName,
    lastName): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      email, password).then((user) => {
        firebase.auth().onAuthStateChanged( (user)=> {
          if (user) {
            const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
            const updatedUser = {
              id: user.uid,
              email: user.email,
              firstName,
              lastName,
              photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-811e1.appspot.com/o/default_profile_pic.jpg?alt=media&token=a5591802-0a1e-4bcc-bde8-8231e71a6d13',
              quote: 'Life is like a box of chocolates you never know whats you gonna get',
              bio:'bio is under construction ...'
            }
            userRef.set(updatedUser);
          } else {
            // No user is signed in.
          }
        });

        return true;

      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }
      );
  }


  public login(email: string, password: string): Observable<boolean> {
    return Observable.from(
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((user)=>true)
      .catch((error)=>false)
    );
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out', AlertType.Success));  
    });
  }

private setCurrentUserSnapshot():void{
  this.currentUser.subscribe(user=>this.currentUserSnapshot = user)
}

}



