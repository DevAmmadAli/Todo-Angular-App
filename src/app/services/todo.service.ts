import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ITodo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  BASE_URL = environment.apiURL;

  constructor(private http: HttpClient) {}

  headerOptions = {};

  getTodos() {
    return this.http.get(`${this.BASE_URL}todo`, { withCredentials: true });
  }

  getTodo(id: string) {
    return this.http.get(`${this.BASE_URL}todo/${id}`, {
      withCredentials: true,
    });
  }

  createTodo(body: ITodo) {
    return this.http.post(`${this.BASE_URL}todo`, body, {
      withCredentials: true,
    });
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.BASE_URL}todo/${id}`, {
      withCredentials: true,
    });
  }

  updateTodo(id: string, body: ITodo) {
    return this.http.put(`${this.BASE_URL}todo/${id}`, body, {
      withCredentials: true,
    });
  }
}
