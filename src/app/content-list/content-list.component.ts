import {Component, OnInit} from '@angular/core';
import {User} from "../Shared/models/user";
import {ContentListItemComponent} from "../content-list-item/content-list-item.component";
import {CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {MyStoreService} from "../Services/my-store.service";
import {Router, RouterLink} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {ProductDescriptionPipe} from "../pipes/product-description.pipe";

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    ContentListItemComponent,
    NgForOf,
    NgClass,
    RouterLink,
    NgIf,
    CurrencyPipe,
    UpperCasePipe,
    TitleCasePipe,
    ProductDescriptionPipe
  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})
export class ContentListComponent implements OnInit {
  displayedColumns: string[]=['id','productName','quantity','color','giftWrap']
  userList: User[] =[]
  error:string |null=null;


  constructor(private myStoreService: MyStoreService , private router: Router)
  {}
  ngOnInit() {
    this.myStoreService.getMyStore().subscribe({
      next: (data: User[]) => {
        this.userList = data;
          this.error = null
      },

      error: err => {
        this.error = "Error fetching My store";
        console.log('My store data fetching complete', err);
      },
      complete: () => console.log("My store data fetch complete!")
    });
  }
  selectedItem?:User;
  selectItem(item:User):void{
    this.selectedItem=item;
  }
  delete(id : number):void{
    this.userList = this.userList.filter(item => item.id !== id);
  }

  navigateToItemList(): void {
    this.router.navigate(['/modify-item']);
  }
}
