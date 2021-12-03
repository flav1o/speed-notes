import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Getpad } from '../interfaces/getpad';

@Injectable({
  providedIn: 'root'
})
export class GetPadService {

  constructor(private _http: HttpClient) { }

  apiGetData(url:string) {
    return this._http.get<any>('http://localhost:3001/notepad/' + url);
  }
}