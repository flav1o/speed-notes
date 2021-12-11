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
    lineCounter: true,
    background: "https://i.pinimg.com/originals/85/9a/f7/859af748d1eed0d67d5801a6df188a89.jpg"
  }
}
