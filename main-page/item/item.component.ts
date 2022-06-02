import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataControlService } from '../data-control.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() Index: number = 0;
  @Input() item: Item = {
    header: '',
    imageUrl: '',
    brand: '',
    price: 0,
    description: '',
    category: '',
    itemID: 0,
    size: [],
  };
  showMore: boolean = false;
  message: string = 'expand_less';
  searchMode: boolean = false;

  constructor(
    private dataControl: DataControlService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataControl.SearchMode.subscribe((value) => {
      this.searchMode = value;
    });
  }

  onEdit(Index: number) {
    if (!this.searchMode) {
      const id = '/main/' + Index.toString() + '/edit';
      this.router.navigate([id]);
      return;
    }
    const id =
      '/main/' +
      this.dataControl.getItemByItemID(this.item.itemID).toString() +
      '/edit';
    this.router.navigate([id]);
  }

  onDelete(Index: number) {
    if (!this.searchMode) {
      this.dataControl.deleteItemHandler(Index);
      return;
    }
    const id = this.dataControl.getItemByItemID(this.item.itemID);
    this.dataControl.deleteItemHandler(id);
    this.searchMode = false;
  }

  showTrigger() {
    this.showMore = this.showMore ? false : true;
    this.message =
      this.message === 'expand_less' ? 'expand_more' : 'expand_less';
  }
}
