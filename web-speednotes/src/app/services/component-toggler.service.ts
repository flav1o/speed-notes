import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentTogglerService {

  constructor() { }

  settingsModal : boolean = false;
}
