import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  AuthLogin(): boolean {
    if (localStorage.getItem(environment.keyLocalAuthenInfo) !== null) {
      return true;
    } else {
      return false;
    }

  }
}
