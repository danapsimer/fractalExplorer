import * as fromFractal from './fractal.reducer';
import {
  selectFractalImageLoading,
  selectFractalImageLoadingError,
  selectFractalState,
  selectFractalURI
} from './fractal.selectors';
import {initialState} from './fractal.reducer';

describe('Fractal Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFractalState({
      [fromFractal.fractalFeatureKey]: {...initialState, fractalType: 'mandelbrot', uri: '/fractal/mandelbrot'}
    });

    expect(result).toEqual({...initialState, fractalType: 'mandelbrot', uri: '/fractal/mandelbrot'});
  });
  it('should select the fractal URL', () => {
    const result = selectFractalURI({
      [fromFractal.fractalFeatureKey]: {...initialState, fractalType: 'mandelbrot', uri: '/fractal/mandelbrot'}
    });

    expect(result).toEqual('/fractal/mandelbrot');
  });
  it('should select the fractal image loading state', () => {
    const result = selectFractalImageLoading({
      [fromFractal.fractalFeatureKey]: {...initialState, imageLoading: true}
    });

    expect(result).toEqual(true);
  });
  it('should select the fractal image loading error state', () => {
    const result = selectFractalImageLoadingError({
      [fromFractal.fractalFeatureKey]: {...initialState, imageLoadingError: 'an error occurred'}
    });

    expect(result).toEqual('an error occurred');
  });
});
