import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _userData: UserDataService
  ) { }

  contentTextArea: string = "";

  ngOnInit(): void {
    const notepadID = this._activatedRoute.snapshot.paramMap;

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
}

//TODO: CHECK IF THE USER DATA HAS DATA, IF NOT WE NEED TO MAKE A REQUEST