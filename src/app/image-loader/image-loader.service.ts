import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor() {
  }

  public loadImage$(url): Observable<HTMLImageElement> {
    return new Observable(observer => {
      const img = new Image();
      img.onload = (event) => {
        setTimeout(() => {
          console.log('ImageLoaderServce: calling next...');
          observer.next(img);
          console.log('ImageLoaderServce: calling complete...');
          observer.complete();
          console.log('ImageLoaderServce: done ');
        }, 5);
      };
      img.onerror = (error) => {
        console.log('ImageLoaderServce: calling error(' + error + '...');
        observer.error(error);
        console.log('ImageLoaderServce: calling complete...');
        observer.complete();
        console.log('ImageLoaderServce: errored.');
      };
      img.src = url;
    });
  }
}
