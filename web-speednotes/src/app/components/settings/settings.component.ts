import { Component, OnInit } from '@angular/core';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
      public componentToggler: ComponentTogglerService,
      public user: UserDataService
    ) { }

  ngOnInit(): void {
  }

  changeSettings(settingItem: string, event:any) {
    if(settingItem === 'autoSave') 
      this.user.userSettings.autoSave = event.explicitOriginalTarget.checked;

    if(settingItem === 'lineCounter') 
      this.user.userSettings.lineCounter = event.explicitOriginalTarget.checked;

    localStorage.setItem('userSettings', JSON.stringify(this.user.userSettings));
  }

  closeSettingsModal(): void {
    this.componentToggler.settingsModal = false;
  }
}
