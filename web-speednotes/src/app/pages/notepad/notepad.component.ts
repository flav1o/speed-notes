import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pad } from 'src/app/interfaces/pad';
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
    private _userData: UserDataService,
    private _getPad: GetPadService,
    private _updateData: UpdateDataService
  ) { }

  contentTextArea: string = "";
  notepadID: string = ""
  latestUpdateContent: string = "";

  ngOnInit(): void {
    this.notepadID = this._activatedRoute.snapshot.paramMap.get('id') || '0';

    if (this._userData.userData.url === '') {
      this._getPad.apiGetData(this.notepadID).subscribe(
        data => this.onSuccess(data),
        error => console.log(error)
        );
      }
      
    this.contentTextArea = this._userData.userData.content;
    this.checkNumLines()
    this.autoSave()
  }

  onSuccess(data: Pad): void {
    let { url, date, content, author, email } = data;
    this._userData.userData = { url, date, content, author, email }

    this.contentTextArea = this._userData.userData.content;
    this.checkNumLines()
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
    setInterval(() => {
      this._userData.userData.content = this.contentTextArea;
      
      if(this.latestUpdateContent !== this._userData.userData.content) {
        this._updateData.updateData(this._userData.userData, +this.notepadID).subscribe((data) =>  {
          this.latestUpdateContent = data.content;
        });
      }
    }, 5000);
  }

}
