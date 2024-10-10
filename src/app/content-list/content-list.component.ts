import {Component, OnInit} from '@angular/core';
import {User} from "../Shared/models/user";
import {ContentListItemComponent} from "../content-list-item/content-list-item.component";
import {NgClass, NgForOf} from "@angular/common";
import {MyStoreService} from "../Services/my-store.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    ContentListItemComponent,
    NgForOf,
    NgClass,
    RouterLink
  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})
export class ContentListComponent implements OnInit {
  displayedColumns: string[]=['id','productName','quantity','color','giftWrap']
  userList: User[] =[]

  constructor(private myStoreService: MyStoreService) {

  }
  ngOnInit() {
    this.myStoreService.getMyStore().subscribe({
      next:(data: User[]) => this.userList = data,
      error: err => console.error("Error fetching My store",err),
    complete:() => console.log('My store data fetching complete'),
    })
  }
  selectedItem?:User;
  selectItem(item:User):void{
    this.selectedItem=item;
  }
}
