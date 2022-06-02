import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { DataControlService } from './main-page/data-control.service';
import { Item } from './main-page/item.model';

@Injectable()
export class DataStorageService {
  itemArray: Item[] = [];
  dataUrl: string =
    'https://onlinestore-87d8c-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(
    private dataControl: DataControlService,
    private http: HttpClient
  ) {}

  FetchData() {
    return this.http.get<Item[]>(this.dataUrl + 'Items.json').pipe(
      tap((response: Item[]) => {
        this.dataControl.getItemsHandler(response);
      })
    );
  }

  StoreData() {
    this.dataControl.changingServerItemsValueHandler();
    this.itemArray = this.dataControl.returnItemsHandler();
    this.http.put(this.dataUrl + 'Items.json', this.itemArray).subscribe(
      (response) => {
        this.errorHandler('Data Saved successfully');
      },
      (error) => {
        this.errorHandler(error.name);
      }
    );
    this.dataControl.changeloadingMode(false);
  }

  private errorHandler(error: string) {
    this.dataControl.sendnewMessageHandler(error);
  }
}
