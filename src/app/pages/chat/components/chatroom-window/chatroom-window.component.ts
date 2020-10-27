import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../../../classes/message';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from '../../../../services/chatroom.service';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer:ElementRef;

  public chatroom: Observable<any>;
  private subscriptions: Subscription[] = [];
public messages:Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private loadingService: LoadingService
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
       // this.loadingService.isLoading.next(false);
      })
    );
    this.subscriptions.push(
this.chatroomService.selectedChatroomMessages.subscribe(messages=>{
  this.messages = messages;
  //this.loadingService.isLoading.next(false);
})
    );
  }

  ngOnInit() {
    this.scrollToBotom();
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatroomService.changeChatroom.next(chatroomId);
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewChecked(){
    this.scrollToBotom();
  }

  private scrollToBotom():void{
    try{
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }catch(err){}
  }

}
