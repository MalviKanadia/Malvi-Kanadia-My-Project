import {Component, Input, OnInit} from '@angular/core';
import {User} from "../Shared/models/user";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MyStoreService} from "../Services/my-store.service";

@Component({
  selector: 'app-content-list-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './content-list-item.component.html',
  styleUrl: './content-list-item.component.css'
})
export class ContentListItemComponent implements OnInit {
  item:User | undefined;
  userList: User[] =[];
  currentIndex: number=0;


  constructor(
    private route: ActivatedRoute,
    private myStoreService:  MyStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myStoreService.getMyStore().subscribe(user => {
      this.userList = user;

      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if (id) {
          this.currentIndex = this.userList.findIndex(user => user.id === id);
          this.item = this.userList[this.currentIndex];
        }


      });
    });
  }
  goBack(): void {
    this.router.navigate(['/items']);
  }

  goForward(): void {
    if(this.currentIndex <this.userList.length-1) {
      this.currentIndex++;
      this.router.navigate(['/items',this.userList[this.currentIndex].id]);
    }
  }

  goBackward(): void {
    if(this.currentIndex >0) {
      this.currentIndex--;
      this.router.navigate(['/items',this.userList[this.currentIndex].id]);
    }
  }


}
