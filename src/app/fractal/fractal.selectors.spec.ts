import * as fromFractal from './fractal.reducer';
import {selectFractalState, selectFractalURI} from './fractal.selectors';

describe('Fractal Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFractalState({
      [fromFractal.fractalFeatureKey]: {fractalType: 'mandelbrot', uri: '/fractal/mandelbrot'}
    });

    expect(result).toEqual({fractalType: 'mandelbrot', uri: '/fractal/mandelbrot'});
  });
  it('should select the feature state', () => {
    const result = selectFractalURI({
      [fromFractal.fractalFeatureKey]: {fractalType: 'mandelbrot', uri: '/fractal/mandelbrot'}
    });

    expect(result).toEqual('/fractal/mandelbrot');
  });
});
