import { Component, OnInit } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _componentToggler: ComponentTogglerService) { }

  ngOnInit(): void {
  }

  toggleSettings(): void {
    this._componentToggler.settingsModal = true;
  }

}
