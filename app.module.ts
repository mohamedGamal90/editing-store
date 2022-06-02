import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DataStorageService } from './data-storage.service';
import { DataControlService } from './main-page/data-control.service';
import { EditPageComponent } from './main-page/edit-page/edit-page.component';
import { ItemsResolverService } from './main-page/items-resolver.service';
import { ShorteningWordsPipe } from './main-page/shortening-words.pipe';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';
import { MessageComponent } from './shared/message/message.component';
import { ItemComponent } from './main-page/item/item.component';
import { AuthComponent } from './Auth/auth.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    resolve: [ItemsResolverService],
    children: [
      {
        path: 'add',
        component: EditPageComponent,
      },
      {
        path: ':id/edit',
        component: EditPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainPageComponent,
    NavBarComponent,
    EditPageComponent,
    ShorteningWordsPipe,
    LoadingScreenComponent,
    ItemComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [DataControlService, DataStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
