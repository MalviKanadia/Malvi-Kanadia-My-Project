import { Component } from '@angular/core';
import {User} from "../Shared/models/user";
import {ContentListItemComponent} from "../content-list-item/content-list-item.component";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    ContentListItemComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})
export class ContentListComponent {
  userList: User[] =[
    {id:1, productName:"WaterBottle", quantity:1, color:"cyan", giftWrap:false},
    {id:2, productName:"Bag", quantity:1, color:"black",  giftWrap:false},
    {id:3, productName:"LunchBox",  quantity:2, color:"biege",  giftWrap:true},
    {id:4, productName:"Box", quantity:4, color:"purple", giftWrap:true},]

}
