import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../interfaces/user';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public currentUser: any = null;
  public userId: string = '';
  private subscriptions: Subscription[] = [];
  public uploadPercent: number = 0;  
  public downloadUrl: Observable<any> | null = null;

  constructor(
    private alertService:AlertService,
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore,
    private location: Location
  ) {
    this.loadingService.isLoading.next(true);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
      })
    );
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    );
  }

  public uploadFile(event){
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const task = this.fs.upload(filePath,file);
    const fileRef = this.fs.ref(filePath);
    //
    //observe the percentage changes
    this.subscriptions.push(
      task.percentageChanges().subscribe(percentage=>{
        if(percentage<100){
          this.loadingService.isLoading.next(true);
        }else{
          this.loadingService.isLoading.next(false); 
        }
        this.uploadPercent = percentage;
      })
    );
    this.subscriptions.push(
   fileRef.getDownloadURL().subscribe(url=> this.downloadUrl = url))
  }

  public save():void{
    let newPhotoUrl;
    if(this.downloadUrl){
      newPhotoUrl = this.downloadUrl;

    }else{
      newPhotoUrl = this.currentUser.photoUrl;
    }
    const user = Object.assign({}, this.currentUser, {photoUrl: newPhotoUrl});
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(user); 
    this.alertService.alerts.next(new Alert('Your profile was succefully updated !',AlertType.Success));
    this.location.back();
  }

  ngOnDestroy() { 
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}




