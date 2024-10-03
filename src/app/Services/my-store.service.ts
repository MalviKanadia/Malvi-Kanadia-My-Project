import { Injectable } from '@angular/core';
import {User} from "../Shared/models/user";
import {userList} from "../Shared/data/mock-content";
import {Observable, of} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class MyStoreService {
  private students: User[] =   userList;
  constructor() { }
    getMyStore(): Observable<User[]> {
     return of (userList);
    }
}
