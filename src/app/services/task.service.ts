import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  BASE_URL = environment.apiURL;

  constructor(private http: HttpClient) {}

  headerOptions = {};

  getTasks() {
    return this.http.get(`${this.BASE_URL}tasks`, { withCredentials: true });
  }

  getTask(id: string) {
    return this.http.get(`${this.BASE_URL}tasks/${id}`, {
      withCredentials: true,
    });
  }

  createTask(body: ITask) {
    return this.http.post(`${this.BASE_URL}tasks`, body, {
      withCredentials: true,
    });
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.BASE_URL}tasks/${id}`, {
      withCredentials: true,
    });
  }

  updateTask(id: string, body: ITask) {
    return this.http.put(`${this.BASE_URL}tasks/${id}`, body, {
      withCredentials: true,
    });
  }
}
