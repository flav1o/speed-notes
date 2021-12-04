import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pad } from '../interfaces/pad';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private _http: HttpClient) { }

  updateData(data: Pad, padId:number){
    console.log("data from service ->", data);
    return this._http.put<Pad>(`http://localhost:3001/notepad/${padId}`, data)
  }
}
