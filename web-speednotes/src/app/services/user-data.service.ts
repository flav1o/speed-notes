import { Injectable } from '@angular/core';
import { Pad } from '../interfaces/pad';
import { Settings } from '../interfaces/settings';

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

  userSettings: Settings = {
    autoSave: false,
    lineCounter: true
  }
}
