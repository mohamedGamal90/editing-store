import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './item.model';

@Injectable()
export class DataControlService {
  itemArray = new Subject<Item[]>();
  SearchMode = new Subject<boolean>();
  loadingMode = new Subject<boolean>();
  message = new Subject<string>();

  isinSearchMode: boolean = false;
  private items: Item[] = [];
  private serverItems: Item[] = [];
  private searchItems: Item[] = [];

  isinloadingMode: boolean = false;

  constructor() {}

  getItemsHandler(items: Item[]) {
    this.items = items;
    this.serverItems = items.slice();
    return this.itemArray.next(this.items.slice());
  }

  returnItemsBeforeSearchHandler() {
    this.itemArray.next(this.items.slice());
  }

  changingServerItemsValueHandler() {
    this.serverItems = this.items.slice();
  }

  returnOriginalItemsHandler() {
    this.items = this.serverItems.slice();
    this.itemArray.next(this.serverItems.slice());
  }

  returnItemsHandler() {
    return this.items.slice();
  }

  returnOneItemHandler(index: number) {
    return this.items[index];
  }

  editItemHandler(index: number, item: Item) {
    this.items[index] = item;
    this.itemArray.next(this.items.slice());
    if (this.isinSearchMode) {
      this.changeSearchMode(false);
    }
  }

  deleteItemHandler(Index: number) {
    this.items.splice(Index, 1);
    this.itemArray.next(this.items.slice());
    if (this.isinSearchMode) {
      this.changeSearchMode(false);
    }
  }

  addItemHandler(item: Item) {
    this.items.push(item);
    this.itemArray.next(this.items.slice());
  }

  getItemByItemID(ItemID: number) {
    let index: number = 0;
    this.items.map((value, Index) => {
      if (value.itemID !== ItemID) {
        return;
      }
      index = Index;
      return;
    });
    return index;
  }

  searchHandler(itemId: string) {
    this.changeSearchMode(true);
    this.searchItems = [];
    let searchIdLength = itemId.toString().length;
    this.items.map((value: any, index: number) => {
      if (String(value.itemID).slice(0, searchIdLength) === itemId) {
        return this.searchItems.push(this.items[index]);
      }
      return;
    });
    return this.itemArray.next(this.searchItems);
  }

  changeSearchMode(value: boolean) {
    this.isinSearchMode = value;
    this.SearchMode.next(this.isinSearchMode);
  }
  changeloadingMode(value: boolean) {
    this.isinloadingMode = value;
    this.loadingMode.next(this.isinloadingMode);
  }
  sendnewMessageHandler(message: string) {
    this.message.next(message);
  }
}
