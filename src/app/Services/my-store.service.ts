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
     return of (userList);
    }
    //getting item by id
    getItemById(id: number): Observable<User | undefined> {
    const item = this.items.find(user => user.id === id);
    return of(item);
    }

    //adding item
    addItem(newItem: User) : Observable <User[]>{
    this.items.push(newItem)
    return of (this.items);
    }

    //updating item
    updateItem(updatedItem:User): Observable <User[]>{
    const index = this.items.findIndex(user => user.id !== updatedItem.id);
    if(index !== -1){
      this.items[index]=updatedItem;
    }
    return of(this.items);
    }

    //deleting item
    deleteItem(itemId: number) : Observable <User[]>{
    this.items = this.items.filter(user => user.id !== itemId);
    return of (this.items);
    }
}
