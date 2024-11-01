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


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private myStoreService: MyStoreService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      id: ['', Validators.required],
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      color: [''],
      giftWrap: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.myStoreService.getItemById(+id).subscribe(items => {
        if(items) {
          this.items = items;

          this.itemForm.patchValue(items);
        }
      });
    }
  }

  onSubmit(): void {
    const items: User = this.itemForm.value;
    if (items.id) {
      this.myStoreService.updateItem(items);
    } else {
      const newId = this.myStoreService.generateNewId();
      items.id = newId;
      this.myStoreService.addItem(items);
    }

    this.router.navigate(['/items']);
  }





}
