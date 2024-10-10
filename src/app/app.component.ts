import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {User} from "./Shared/models/user";
import {JsonPipe, NgForOf} from "@angular/common";
import {ContentListItemComponent} from "./content-list-item/content-list-item.component";
import {ContentListComponent} from "./content-list/content-list.component";
import {MyStoreService} from "./Services/my-store.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, JsonPipe, ContentListComponent, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyStore';


}
