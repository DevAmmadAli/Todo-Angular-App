import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL = environment.apiURL;

  constructor(private http: HttpClient) {}

  login(body: IUser) {
    return this.http.post(`${this.BASE_URL}user/login`, body, {
      withCredentials: true,
    });
  }

  signUp(body: IUser) {
    return this.http.post(`${this.BASE_URL}user`, body, {
      withCredentials: true,
    });
  }

  getLoginUser() {
    return this.http.get(`${this.BASE_URL}user/current`, {
      withCredentials: true,
    });
  }
}
