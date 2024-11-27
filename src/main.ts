import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {ContentListComponent} from "./app/content-list/content-list.component";
import {ContentListItemComponent} from "./app/content-list-item/content-list-item.component";
import {ModifyListItemComponent} from "./app/modify-list-item/modify-list-item.component";
import {PageNotFoundComponent} from "./app/page-not-found/page-not-found.component";
import {provideHttpClient} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./app/Services/in-memory-data.services";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



const routes: Routes = [
  {path:'',redirectTo: '/items', pathMatch: 'full'},
  {path:'items',component:ContentListComponent},
  {path:'items/:id',
    loadComponent: () =>
  import('./app/content-list-item/content-list-item.component').then(m => m.ContentListItemComponent)},
  {path: 'modify-item',
  loadComponent:() =>
    import('./app/modify-list-item/modify-list-item.component').then(m => m.ModifyListItemComponent),
  },
  {path: '**',
  loadComponent:() =>
  import('./app/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)},

];
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 1 })), provideAnimationsAsync()
  ],
}).catch((err) => console.error(err));
