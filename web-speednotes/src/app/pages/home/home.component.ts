import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Getpad } from 'src/app/interfaces/getpad';
import { Pad } from 'src/app/interfaces/pad';
import { GetPadService } from 'src/app/services/get-pad.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastSearchedList: Array<string> = [];
  filteredSearchedList: Array<string> = [];
  
  constructor(
    private _http: HttpClient,
    private _getPad: GetPadService,
    private _router: Router,
    private _userData: UserDataService
    ) { }

  ngOnInit(): void {
    
  }

  search(searchurl:string): void {
    if(!searchurl || searchurl.length == 0) console.log("Errou");

    this._getPad.apiGetData(searchurl).subscribe(      
      data => this.searchOnSuccess(data, searchurl),
      error => this.searchOnError(error)
    );
  }

  searchOnSuccess(data:Pad, searchedurl:string) {
    console.log('success: ', data);
    let { url, content, date, author, email} = data;
    
    this._userData.userData = { url, content, date, author, email }
    this._router.navigate([`notepad/${searchedurl}`]);
  }

  searchOnError(error:object) {
    console.log('erro: ', error);
  }

}
