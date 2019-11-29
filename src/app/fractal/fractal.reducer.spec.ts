import {reducer, initialState} from './fractal.reducer';
import {
  changeC,
  changeCenter,
  changeFractalType,
  changeMaxIter,
  changePrecision,
  changeScale,
  changeUri,
  loadImage, loadImageFailure, loadImageSuccess
} from './fractal.actions';

describe('Fractal Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
  describe('change Center', () => {
    it('should return the updated State', () => {
      const action = changeCenter({center: {r: -1.0, i: 0.5}});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, center: {r: -1.0, i: 0.5}});
    });
  });
  describe('change C', () => {
    it('should return the updated State', () => {
      const action = changeC({C: {r: -1.0, i: 0.5}});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, C: {r: -1.0, i: 0.5}});
    });
  });
  describe('change Scale', () => {
    it('should return the updated State', () => {
      const action = changeScale({scale: 1.0});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, scale: 1.0});
    });
  });
  describe('change MaxIter', () => {
    it('should return the updated State', () => {
      const action = changeMaxIter({maxIter: 100});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, maxIter: 100});
    });
  });
  describe('change Precision', () => {
    it('should return the updated State', () => {
      const action = changePrecision({precision: 256});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, precision: 256});
    });
  });
  describe('change FractalType', () => {
    it('should return the updated State', () => {
      const action = changeFractalType({fractalType: 'julia'});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, fractalType: 'julia'});
    });
  });
  describe('change URI', () => {
    it('should return the updated State', () => {
      const action = changeUri({uri: '/fractal/julia'});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, uri: '/fractal/julia'});
    });
  });
  describe('Image Loading', () => {
    it('loadImage should toggle imageLoading on.', () => {
      const action = loadImage();

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, imageLoading: true});
    });
    it('loadImageSuccess should toggle imageLoading off and set img.', () => {
      const dummyElement = document.createElement('img');
      const action = loadImageSuccess({img: dummyElement});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, imageLoading: false, img: dummyElement});
    });
    it('loadImageSuccess should toggle imageLoading off and set imageLoadingError.', () => {
      const action = loadImageFailure({error: 'an error occurred'});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, imageLoading: false, imageLoadingError: 'an error occurred'});
    });
  });
});
