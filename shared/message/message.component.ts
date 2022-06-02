import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DataControlService } from '../../main-page/data-control.service';

@Component({
  selector: 'app-message-screen',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('animate', [
      state(
        'in',
        style({
          transform: 'translateY(75px)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          top: '75px',
          transform: 'translateX(500px)',
          opacity: 0.8,
        })
      ),
      transition('* => in', [animate('0.5s')]),
      transition('in => out', [animate('0.5s')]),
    ]),
  ],
})
export class MessageComponent implements OnInit {
  @Input() errorMessage: string = '';
  mType: boolean = false;
  animationState: string = 'in';
  constructor(private dataControl: DataControlService) {}
  ngOnInit() {
    this.messageType();
    const interval2 = setInterval(() => {
      this.animationState = 'out';
      const interval3 = setInterval(() => {
        clearInterval(interval2);
        clearInterval(interval3);
        this.dataControl.sendnewMessageHandler('');
      }, 500);
    }, 10000);
  }
  onClose() {
    this.animationState = 'out';
    const interval = setInterval(() => {
      clearInterval(interval);
      this.dataControl.sendnewMessageHandler('');
    }, 500);
  }
  messageType() {
    if (this.errorMessage === 'Data Saved successfully') {
      this.mType = true;
    }
    return;
  }
}
