import {Component, OnInit} from '@angular/core';
import {User} from "../Shared/models/user";
import {ContentListItemComponent} from "../content-list-item/content-list-item.component";
import {CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {MyStoreService} from "../Services/my-store.service";
import {Router, RouterLink} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {ProductDescriptionPipe} from "../pipes/product-description.pipe";
import {ModifyListItemComponent} from "../modify-list-item/modify-list-item.component";
import {HoverHighlightDirective} from "../directives/hover-highlight.directive";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-content-list',
    imports: [
        ContentListItemComponent,
        NgForOf,
        NgClass,
        RouterLink,
        NgIf,
        CurrencyPipe,
        UpperCasePipe,
        TitleCasePipe,
        ProductDescriptionPipe,
        HoverHighlightDirective,
        MatList,
        MatListItem,
        MatButton
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
import { Component, OnInit } from '@angular/core';
import { SitterService} from '../Services/sitter.service';
import { PetSitter} from '../Shared/pet-sitter';
import {Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from '@angular/material/card';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatGridList, MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import {MatOption, MatOptionModule} from '@angular/material/core';
import {MatFormField, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SitterStatusDirective} from '../directives/sitter-status.directive';

@Component({
  selector: 'app-sitter-list',
  templateUrl: './sitter-list.component.html',
  styleUrls: ['./sitter-list.component.scss'],
  imports: [
    RouterLink,
    NgForOf,
    FormsModule,
    MatCardActions,
    MatButton,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatGridTile,
    MatGridList,
    MatOption,
    MatSelect,
    MatFormField,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    SitterStatusDirective
  ],
  standalone: true
})
// export class SitterListComponent implements OnInit {
//   sitters: PetSitter[] = [];
//   filteredSitters: PetSitter[] = [];
//   specialtyFilter: string = '';
//   availabilityFilter: boolean | '' = '';
//
//   constructor(private sitterService: SitterService,
//               private router: Router) {}
//
//   ngOnInit(): void {
//     this.sitterService.getSitters().subscribe((data) => {
//       this.sitters = data;
//       this.filteredSitters = data;
//     });
//   }
//
//   filterSitters(): void {
//     this.filteredSitters = this.sitters.filter((sitter) => {
//       const specialtyMatch =
//         !this.specialtyFilter || sitter.specialty === this.specialtyFilter;
//       const availabilityMatch =
//         this.availabilityFilter === '' ||
//         sitter.available === this.availabilityFilter;
//       return specialtyMatch && availabilityMatch;
//     });
//
//   }
//
//   navigateToModifySitter(id: number): void {
//     this.router.navigate(['/modify-sitter', id]);
//   }
//
//   navigateToAddSitter(): void {
//     this.router.navigate(['/modify-sitter']);
//   }
// }
