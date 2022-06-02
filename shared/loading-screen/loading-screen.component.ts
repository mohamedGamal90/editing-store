import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  template:
    '<div class="darkBG"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {}
