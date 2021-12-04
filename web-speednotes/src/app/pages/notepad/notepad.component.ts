import { LocalizedString } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pad } from 'src/app/interfaces/pad';
import { Settings } from 'src/app/interfaces/settings';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';
import { GetPadService } from 'src/app/services/get-pad.service';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private _router: Router,
    public userData: UserDataService,
    private _getPad: GetPadService,
    private _updateData: UpdateDataService,
    public componentToggler: ComponentTogglerService
  ) { }

  contentTextArea: string = "";
  notepadID: string = ""
  latestUpdateContent: string = "";

  ngOnInit(): void {
    this.userData.userSettings = JSON.parse(localStorage.getItem('userSettings') || '{ autoSave: false, lineCounter: true }');
    this.notepadID = this._activatedRoute.snapshot.paramMap.get('id') || '0';

    if (this.userData.userData.url === '')
      this._getPad.apiGetData(this.notepadID).subscribe(
        data => this.onSuccess(data),
        error => console.log(error)
      );

    console.log("USER ->", this.userData.userSettings)
    this.contentTextArea = this.userData.userData.content;
  }

  onSuccess(data: Pad): void {
    let { url, date, content, author, email } = data;

    this.userData.userData = { url, date, content, author, email }
    this.contentTextArea = this.userData.userData.content;
    this.checkNumLines()
    this.autoSave()
  }

  checkNumLines(): void {
    const nLines: number = this.contentTextArea.split('\n').length;
    const divToAppend = document.getElementsByClassName("line-counter");

    divToAppend[0].innerHTML = "";

    for (let i = 1; i <= nLines; i++) {
      divToAppend[0].innerHTML += `<p class="numberOnLine">${i}\n</p>`;
    }
  }

  autoSave(): void {
    if(!this.userData.userSettings.autoSave) return;
    setInterval(() => {
      this.userData.userData.content = this.contentTextArea;
      
      if(this.latestUpdateContent !== this.userData.userData.content) {
        this._updateData.updateData(this.userData.userData, +this.notepadID).subscribe((data) =>  {
          this.latestUpdateContent = data.content;
        });
      }
    }, 5000);
  }

}
