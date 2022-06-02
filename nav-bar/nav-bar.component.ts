import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { DataStorageService } from '../data-storage.service';
import { DataControlService } from '../main-page/data-control.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @ViewChild('search')
  searchValue!: ElementRef;
  constructor(
    private dataControl: DataControlService,
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataControl.SearchMode.subscribe((value) => {
      if (value === false) {
        this.cancelSearch();
      }
    });
  }

  Search() {
    this.dataControl.searchHandler(this.searchValue.nativeElement.value);
  }
  discardChanges() {
    this.dataControl.returnOriginalItemsHandler();
  }
  cancelSearch() {
    this.searchValue.nativeElement.value = '';
    this.dataControl.returnItemsBeforeSearchHandler();
  }
  saveChanges() {
    this.dataControl.changeloadingMode(true);
    this.dataStorage.StoreData();
  }
  Logout() {
    this.authService.logoutHandler();
  }
}
