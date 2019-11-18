import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State as FractalState} from '../fractal/fractal.reducer';
import {selectFractalURI} from '../fractal/fractal.selectors';
import {Observable} from 'rxjs';
import {concatMap, map, tap} from 'rxjs/operators';
import {windowResized} from '../fractal/fractal.actions';

@Component({
  selector: 'app-fractal-view',
  templateUrl: './fractal-view.component.html',
  styleUrls: ['./fractal-view.component.scss']
})
export class FractalViewComponent implements OnInit, AfterViewInit {
  @ViewChild('fractalCanvas', {static: true})
  private canvasRef: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private store: Store<FractalState>, private hostElement: ElementRef) {
  }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
  }

  private fillCanvas(img) {
    this.canvasRef.nativeElement.width = img.width;
    this.canvasRef.nativeElement.height = img.height;
    this.ctx.drawImage(img, 0, 0);       // DRAW THE IMAGE TO THE CANVAS.
  }

  ngAfterViewInit(): void {
    this.store.pipe(
      select(selectFractalURI),
      map(uri => 'http://localhost:8080' + uri),
      concatMap(url => {
        return new Observable(observer => {
          const img = new Image();
          img.onload = (event) => {
            observer.next(img);
            observer.complete();
          };
          img.src = url;
        });
      }),
    ).subscribe(img => this.fillCanvas(img));

    const windowSize = {
      rx: window.innerWidth - 20,
      ry: window.innerHeight - 20
    };
    console.log('initial windowSize = ',JSON.stringify(windowSize));
    this.store.dispatch(windowResized(windowSize));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const windowSize = {rx: event.target.innerWidth - 10, ry: event.target.innerHeight - 20};
    console.log('windowSize = ' + JSON.stringify(windowSize));
    this.store.dispatch(windowResized(windowSize));
  }
}
