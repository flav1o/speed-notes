import { Injectable } from '@angular/core';
import { Pad } from '../interfaces/pad';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  userData: Pad = {
    url: '',
    content: '',
    date: 0,
    author: '',
    email: ''
  };

}
