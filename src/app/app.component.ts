import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {User} from "./Shared/models/user";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgForOf,JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyStore';
  user1 : User ={id: 1,productName:"WaterBottle",quantity:1,color:"cyan",giftWrap:false,};
  user2 : User ={id: 2,productName:"Bag",quantity:1,color:"black",giftWrap:false,};
  userList: User[] =[this.user1, this.user2,
    {id:3,productName:"LunchBox",quantity:2,color:"biege",giftWrap:true},
    {id:4,productName:"Box",quantity:4,color:"purple",giftWrap:true}]

  toggleGiftWrapStatus(user: User): void {
    user.giftWrap = !user.giftWrap;
  }
}
