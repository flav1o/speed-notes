import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pad } from 'src/app/interfaces/pad';
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
    const newSettings = JSON.stringify({autoSave: false, lineCounter: false, background: "night"});
    
    this.userData.userSettings = JSON.parse(localStorage.getItem('userSettings') || newSettings);
    this.notepadID = this._activatedRoute.snapshot.paramMap.get('id') || '0';

    if (this.userData.userData.url === '')
      this._getPad.apiGetData(this.notepadID).subscribe(
        data => this.onSuccess(data),
        error => console.log(error)
      );

    console.log("USER ->", this.userData.userSettings)
    this.contentTextArea = this.userData.userData.content;
    this.checkNumLines()
  }

  onSuccess(data: Pad): void {
    let { url, date, content, author, email } = data;

    this.userData.userData = { url, date, content, author, email }
    this.contentTextArea = this.userData.userData.content;
    this.checkNumLines()
    this.autoSave()
  }

  checkNumLines(text?:string): void {
    const nLines: number = this.contentTextArea.split('\n').length;
    const divToAppend = document.getElementsByClassName("line-counter");
    divToAppend[0].innerHTML = "";
    
    if(text) this.userData.userData.content = text;

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
          console.log("saving")
        });
      }
    }, 5000);
  }
}
