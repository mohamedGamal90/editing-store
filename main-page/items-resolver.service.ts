import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../data-storage.service';
import { DataControlService } from './data-control.service';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemsResolverService
  implements
    Resolve<
      Item[]
    >
{
  items: any;
  constructor(
    private dataStorage: DataStorageService,
    private dataControl: DataControlService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    this.items = this.dataControl.returnItemsHandler();
    if (this.items.length === 0) {
     return this.dataStorage.FetchData();
    } else {
      return this.items;
    }

  }
}
