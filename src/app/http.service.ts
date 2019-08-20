import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getCakes() {
    return this._http.get('/cakes');
  }

  createCake(data) {
    return this._http.post('/cakes', data);
  }

  createReview(data) {
    console.log(data);
    return this._http.post('/cakes/' + data._id, data.review);
  }
}
