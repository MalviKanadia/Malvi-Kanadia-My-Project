import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {User} from "../Shared/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {MyStoreService} from "../Services/my-store.service";
import {catchError, map, of, switchMap} from "rxjs";
import {HoverHighlightDirective} from "../directives/hover-highlight.directive";
import {HighlightOnFocusDirective} from "../directives/highlight-on-focus.directive";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
    selector: 'app-modify-list-item',
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule,
        HoverHighlightDirective,
        HighlightOnFocusDirective,
        MatFormField,
        MatInput,
        MatCheckbox,
        MatInputModule,
        MatCheckboxModule,
        MatButton,
        MatTooltip,
        MatSlideToggle,
    ],
    templateUrl: './modify-list-item.component.html',
    styleUrl: './modify-list-item.component.css'
})
export class ModifyListItemComponent implements OnInit {
  itemForm: FormGroup;
  items: User | undefined;
  error: string|null=null;
  userList: User[] =[]


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private myStoreService: MyStoreService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      id: [myStoreService.generateNewId()],
      productName: [''],
      quantity: [''],
      color: [''],
      price:[''],
      giftWrap: [false]
    });
  }

  ngOnInit(): void {
    const id =  Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.myStoreService.getItemById(id).subscribe({
        next: item=>{
          if(item){
            this.itemForm.patchValue(item)
          }
      }, error: err => {
        this.error = 'Error fetching item';
        console.error('Error fetching item:', err);
      }
      });
    }

}

  onSubmit(): void {
    if (this.itemForm.valid) {
      const item: User = this.itemForm.value;
      if (item.id) {
        this.myStoreService.updateItem(item).subscribe(() => this.router.navigate(['/items']));
      } else {
        item.id = this.myStoreService.generateNewId();
        this.myStoreService.addItem(item).subscribe(() => this.router.navigate(['/items']));
      }
    }
  }
  delete(id : number):void{
    this.userList = this.userList.filter(item => item.id !== id);
  }

  navigateToItemList(): void {
    this.router.navigate(['/modify-item']);
  }


}
// // modify-sitter.component.ts
// import { Component, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// import {ActivatedRoute, Router, RouterLink} from '@angular/router';
// import { SITTERS} from '../Shared/mock-data';
// import { PetSitter} from '../Shared/pet-sitter';
// import {NgIf} from '@angular/common';
// import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
// import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
// import {MatInput, MatInputModule} from '@angular/material/input';
// import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
// import {MatButton, MatButtonModule} from '@angular/material/button';
//
// @Component({
//   selector: 'app-modify-sitter',
//   templateUrl: './modify-sitter.component.html',
//   imports: [
//     ReactiveFormsModule,
//     NgIf,
//     MatCard,
//     MatCardHeader,
//     MatCardContent,
//     MatFormField,
//     MatInput,
//     MatCheckbox,
//     MatButton,
//     MatCardModule,
//     MatButtonModule,
//     MatInputModule,
//     MatCheckboxModule,
//     MatFormFieldModule,
//
//   ],
//   styleUrls: ['./modify-sitter.component.scss']
// })
// export class ModifySitterComponent implements OnInit {
//   sitterForm: FormGroup;
//   sitter: PetSitter | undefined;
//   isNewSitter: boolean = true;
//
//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {this.sitterForm = this.fb.group({
//     name: ['', [Validators.required]],
//     age: ['', [Validators.required, Validators.min(18)]],
//     experience: ['', [Validators.required]],
//     specialty: ['', [Validators.required]],
//     rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
//     available: [true],
//     photo: ['']
//   });
//   }
//
//   ngOnInit(): void {
//
//     const sitterId = this.route.snapshot.paramMap.get('id');
//     if (sitterId) {
//       this.isNewSitter = false;
//       this.sitter = SITTERS.find(s => s.id === +sitterId);
//       if (this.sitter) {
//         this.sitterForm.patchValue(this.sitter);
//       }
//     }
//   }
//
//   onSubmit(): void {
//     if (this.sitterForm.valid) {
//       if (this.isNewSitter) {
//         // Adding new sitter logic
//         const newSitter: PetSitter = {
//           ...this.sitterForm.value, id: SITTERS.length + 1,
//         };
//         SITTERS.push(newSitter);
//       } else {
//         // Updating existing sitter logic
//         if (this.sitter) {
//           this.sitter = { ...this.sitterForm.value, id: this.sitter.id };
//           //Type assertion, to work around my null error
//           const index = SITTERS.findIndex(s => s.id === (this.sitter as PetSitter).id);
//           if (index !== -1) {
//             // Update the sitter in the array only if it's found + Type assertion
//             SITTERS[index] = { ...this.sitterForm.value, id: (this.sitter as PetSitter).id };
//           }
//         }
//       }
//
//       this.router.navigate(['/sitters']);
//     }
//   }
// }
