import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { firebase } from '@firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
public currentUser:any = null;

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit() {
  
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.currentUser = user;
      }
    });

  }

}