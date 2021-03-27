import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Todo } from '../model/todo.model'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private apiURL = "https://jsonplaceholder.typicode.com";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiURL + '/todos/');
  }

  createTodos(todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.apiURL + '/todos/', JSON.stringify(todo), this.httpOptions);
  }

  findTodos(id): Observable<Todo> {
    return this.httpClient.get<Todo>(this.apiURL + '/todos/' + id);
  }

  updateTodos(id, todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.apiURL + '/todos/' + id, JSON.stringify(todo), this.httpOptions);
  }

  deleteTodos(id){
    return this.httpClient.delete<Todo>(this.apiURL + '/todos/' + id, this.httpOptions);
  }
}
