import {Component, Input} from '@angular/core';
import {User} from "../Shared/models/user";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-content-list-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './content-list-item.component.html',
  styleUrl: './content-list-item.component.css'
})
export class ContentListItemComponent {
  @Input() item ?:User;

}
