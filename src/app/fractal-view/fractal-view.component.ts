import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State as FractalState} from '../fractal/fractal.reducer';
import {selectFractalImage, selectFractalURI} from '../fractal/fractal.selectors';
import {Observable} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {windowResized, zoomIn} from '../fractal/fractal.actions';
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
      select(selectFractalImage),
    ).subscribe(img => {
      if (img) {
        this.fillCanvas(img);
      }
    });

    const windowSize = {
      rx: window.innerWidth - 20,
      ry: window.innerHeight - 20
    };
    console.log('initial windowSize = ', JSON.stringify(windowSize));
    this.store.dispatch(windowResized(windowSize));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const windowSize = {rx: event.target.innerWidth - 10, ry: event.target.innerHeight - 20};
    this.store.dispatch(windowResized(windowSize));
  }

  onClick(event) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.store.dispatch(zoomIn({factor: 0.5, x, y}));
  }
}
