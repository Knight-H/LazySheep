import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UploadService {
  order:any;

  constructor(
    private http:Http
  ) { }

  sendOrder(order, file){
    let headers = new Headers();
    headers.append('Content-Type', undefined);

    let formData = new FormData();
    formData.append('file', file);
    formData.append('order', order);

    return this.http.post('order/', formData, {headers: headers})
      .map(res => res.json());
  }

}
