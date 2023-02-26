import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {formatDate} from "@angular/common";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string = "http://localhost:8088";
  constructor(private  http:HttpClient) { }

  public  getRessource (url: string ){
    return this.http.get(this.host+url);
  }

  uploadPhotoProduct(file : File, idProduct : any):  Observable<HttpEvent<{ }>> {
    let formdata : FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata,{
      reportProgress : true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.host+'/deleteProduct/'+id, { responseType: 'text' });
  }

}
