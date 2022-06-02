import { Component } from '@angular/core';
import { DataControlService } from './main-page/data-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'backend';
  loading: boolean = false;
  message: string = '';
  constructor(private dataControl: DataControlService) {}
  ngOnInit() {
    this.dataControl.loadingMode.subscribe((value) => {
      this.loading = value;
    });
    this.dataControl.message.subscribe((message) => {
      this.message = message;
    });
  }
}
