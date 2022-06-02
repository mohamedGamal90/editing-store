import { Component, OnInit } from '@angular/core';
import { DataControlService } from './data-control.service';
import { Item } from './item.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private dataControl: DataControlService) {}
  itemArray: Item[] = [];
  ngOnInit() {
    this.itemArray = this.dataControl.returnItemsHandler();
    this.dataControl.itemArray.subscribe((itemsArray: Item[]) => {
      this.itemArray = itemsArray;
    });
  }
}
