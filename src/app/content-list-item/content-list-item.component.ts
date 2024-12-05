import {Component, Input, OnInit} from '@angular/core';
import {User} from "../Shared/models/user";
import {CurrencyPipe, NgIf, NgOptimizedImage, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MyStoreService} from "../Services/my-store.service";
import {HoverHighlightDirective} from "../directives/hover-highlight.directive";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {ProductDescriptionPipe} from "../pipes/product-description.pipe";

@Component({
    selector: 'app-content-list-item',
    imports: [
        NgOptimizedImage,
        NgIf,
        UpperCasePipe,
        CurrencyPipe,
        TitleCasePipe,
        HoverHighlightDirective,
        MatCardHeader,
        MatCardTitle,
        MatCard,
        MatCardContent,
        MatCardSubtitle,
        ProductDescriptionPipe
    ],
    templateUrl: './content-list-item.component.html',
    styleUrl: './content-list-item.component.css'
})
export class ContentListItemComponent implements OnInit {
  item:User | undefined;
  userList: User[] =[];
  currentIndex: number=0;
  error:string|null=null;
  displayedColumns: string[]=['id','productName','quantity','color','giftWrap'];

  constructor(
    private route: ActivatedRoute,
    private myStoreService:  MyStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myStoreService.getMyStore().subscribe({
      next: (users: User[]) => {
        this.userList = users;
        this.error = null;

      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if (id) {
          this.currentIndex = this.userList.findIndex(user => user.id === id);
          this.item = this.userList[this.currentIndex];
        }

      });
  },
      error: (err) => {
        this.error = 'Error fetching items';
        console.error('Error fetching items', err);
      }
      });
    }



}
