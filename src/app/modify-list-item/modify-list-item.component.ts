import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {User} from "../Shared/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {MyStoreService} from "../Services/my-store.service";
import {catchError, map, of, switchMap} from "rxjs";

@Component({
  selector: 'app-modify-list-item',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './modify-list-item.component.html',
  styleUrl: './modify-list-item.component.css'
})
export class ModifyListItemComponent implements OnInit {
  itemForm: FormGroup;
  items: User | undefined;
  error: string|null=null;


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


}
