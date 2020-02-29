import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  queryImage(base64: string, range: number): Observable<any>{
    if (base64.includes('data')) {
      base64 = base64.split(',')[1];
    }
    let body = {
      base64: base64,
      range: range
    }
    return this.http.post(`http://localhost:5002/api/query`, body);;
  }

  uploadImages(images: {base64: string, filename: string}[]): Observable<any> {
    let objects = images.map(image => {
      if (image.base64.includes('data')) {
        return {
          base64: image.base64.split(',')[1],
          filename: image.filename
        }
      } else {
        return image;
      }
    } );
    let body = {
      images: objects
    }
    return this.http.post(`http://localhost:5002/api/loadImages`, body);
  }
}
