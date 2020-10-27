import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import{AlertModule} from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import{LoadingModule} from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { ExampleAnimation } from './animations/exampleAnimation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChatroomService } from './services/chatroom.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { IsOwnerGuard } from './guards/is-owner.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatroomListComponent,
    ChatroomWindowComponent,
    ChatroomTitleBarComponent,
    ExampleAnimation,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AlertModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingModule,
    BrowserAnimationsModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AlertService,
    LoadingService,
    AuthService,
    AuthGuard,
    ChatroomService,
    IsOwnerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
