import {AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State as FractalState} from '../fractal/fractal.reducer';
import {selectFractalURI} from '../fractal/fractal.selectors';
import {filter, flatMap, map, tap, throttleTime} from 'rxjs/operators';
import {loadImage, loadImageFailure, loadImageSuccess, windowResized, zoomIn} from '../fractal/fractal.actions';
import {ImageLoaderService} from '../image-loader/image-loader.service';

@Component({
  selector: 'app-fractal-view',
  styles: [`
    app-fractal-view {
      margin: 0;
      padding: 0;
    }

    canvas {
      margin: 0;
      padding: 0;
    }`],
  template: `
    <canvas #fractalCanvas width="640" height="480" (click)="onClick($event)">
      Sorry, your browser does not support HTML5 canvas element.
    </canvas>
  `
})
export class FractalViewComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('fractalCanvas', {static: true})
  private canvasRef: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private store: Store<FractalState>, private hostElement: ElementRef, private imageLoader: ImageLoaderService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.store.pipe(
      select(selectFractalURI),
      filter(uri => !!uri),
      throttleTime(2000),
      map(uri => 'http://localhost:8080' + uri),
      tap(() => this.store.dispatch(loadImage())),
      flatMap(url => this.imageLoader.loadImage$(url)),
    ).subscribe(
      img => {
        if (img) {
          this.fillCanvas(img);
        }
        this.store.dispatch(loadImageSuccess());
      },
      error => this.store.dispatch(loadImageFailure(error))
    );
    this.dispatchWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.dispatchWindowSize();
  }

  onClick(event) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.store.dispatch(zoomIn({factor: 0.5, x, y}));
  }

  private fillCanvas(img) {
    this.canvasRef.nativeElement.width = img.width;
    this.canvasRef.nativeElement.height = img.height;
    this.ctx.drawImage(img, 0, 0);       // DRAW THE IMAGE TO THE CANVAS.
  }

  private dispatchWindowSize() {
    const windowSize = {
      rx: window.innerWidth - 20,
      ry: window.innerHeight - 20
    };
    this.store.dispatch(windowResized(windowSize));
  }
}
