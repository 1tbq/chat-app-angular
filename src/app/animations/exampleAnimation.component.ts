import { Component } from "@angular/core";
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations'

@Component({
    selector:'animation',
    templateUrl: './exampleAnimation.component.html',
    animations:[
        trigger('divState',[
            state('normal', style({
                'background-color':'red',
                transform:'translateX(0)',
            })),
            state('highlighted',style({
                'background-color':'blue', 'border-radius':'50%',
                transform: 'translateX(400px)'
            })),
            transition('normal => highlighted',animate(1000)),
            transition('highlighted => normal',animate(800))
        ])
    ]
})

export class ExampleAnimation {
state ='normal';
    list =['Milk','Sugar','Bread'];

    onAnimate(){
        this.state==='normal'? this.state ='highlighted':this.state ='normal';
    }

onAdd(item){
    this.list.push(item);
}
 onDelete(item){
     this.list.splice(this.list.indexOf(item),1);
 }

}