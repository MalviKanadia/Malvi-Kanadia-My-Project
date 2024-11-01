import { Injectable } from '@angular/core';
import {User} from "../Shared/models/user";
import {userList} from "../Shared/data/mock-content";
import {Observable, of} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class MyStoreService {
  private items: User[] = userList;
  constructor() { }
    getMyStore(): Observable<User[]> {
     return of (this.items);
    }
    //getting item by id
    getItemById(id: number): Observable<User | undefined> {
      return of(this.items.find(item => item.id === id));
    }

    //adding item
    addItem(item: User) : Observable <User>{
    this.items.push(item)
    return of (item);
    }

    //updating item
    updateItem(updatedItem: User): Observable <User | undefined>{
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if(index > -1){
      this.items[index]=updatedItem;
      return of(updatedItem);
    }
    return of (undefined);
    }

    //deleting item
    deleteItem(id: number) : Observable <User[]>{
    this.items = this.items.filter(item => item.id !== id);
    return of (this.items);
    }
  generateNewId(): number {
    return this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
  }
}
