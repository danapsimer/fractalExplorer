import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor() { }

  public loadImage$(url): Observable<HTMLImageElement> {
    return new Observable(observer => {
      const img = new Image();
      img.onload = (event) => {
        observer.next(img);
        observer.complete();
      };
      img.onerror = (error) => {
        observer.error(error);
        observer.complete();
      };
      img.src = url;
    });
  }
}
