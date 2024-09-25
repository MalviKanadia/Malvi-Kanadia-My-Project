import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {User} from "./Shared/models/user";
import {JsonPipe, NgForOf} from "@angular/common";
import {ContentListComponent} from "./content-list/content-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, JsonPipe, ContentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyStore';

  userList: User[] =[
    {id:1, productName:"WaterBottle", quantity:1, color:"cyan", giftWrap:false,},
    {id:2, productName:"Bag", quantity:1, color:"black",  giftWrap:false,},
    {id:3, productName:"LunchBox",  quantity:2, color:"biege",  giftWrap:true},
    {id:4, productName:"Box", quantity:4, color:"purple", giftWrap:true}]


}
