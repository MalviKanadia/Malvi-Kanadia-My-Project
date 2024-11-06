import { Injectable } from '@angular/core';
import {User} from "../Shared/models/user";
import {userList} from "../Shared/data/mock-content";
import {catchError, Observable, of, throwError} from "rxjs";
import {HttpClient,HttpErrorResponse} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class MyStoreService {
  private apiUrl =  'api/items';

  private items: User[] = userList;
  constructor(private http: HttpClient) { }
    getMyStore(): Observable<User[]> {
     return this.http.get<User[]>(this.apiUrl).pipe(catchError(this.handleError));
    }
    //getting item by id
    getItemById(id: number): Observable<User > {
      return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
    }

    //adding item
    addItem(item: User) : Observable<User>{
    item.id=this.generateNewId();
    return this.http.post<User>(this.apiUrl, item).pipe(catchError(this.handleError));
    }

    //updating item
    updateItem(updatedItem: User): Observable <User | undefined>{
    const url= `${this.apiUrl}/${updatedItem.id}`;
    return this.http.put<User>(url, updatedItem).pipe(catchError(this.handleError));
    }

    //deleting item
    deleteItem(id: number) : Observable <{}>{
    const url= `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
    }
  generateNewId(): number {
    return this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 1;
  }
  private handleError(error: HttpErrorResponse) {
    console.error('API error', error);
    return throwError(()=> new Error('server error, please try again.'));
  }
}
