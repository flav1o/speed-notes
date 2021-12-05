import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() content: string = "";
  
  constructor(
    private _componentToggler: ComponentTogglerService,
    private _user: UserDataService,
  ) { }

  ngOnInit(): void {}

  toggleSettings(): void {
    this._componentToggler.settingsModal = true;
  }

  download(): void {
    const blob = new Blob([
      this._user.userData.content],
      { type: "text/plain;charset=utf-8" });
    saveAs(blob, `speednotes-pad-${this._user.userData.url}.txt`);
  }
}