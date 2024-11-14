import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../Shared/models/user";

@Pipe({
  name: 'productDescription',
  standalone: true
})
export class ProductDescriptionPipe implements PipeTransform {

  transform(user: User): string {
    return `${user.productName} ${user.description}`;
  }

}
