import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// const errHandler = window.onerror;
//
// window.onerror = (message, source, lineno, colno, error) => {
//   console.log('error occurred: ', message, source, lineno, colno, error);
//   if (errHandler) {
//     errHandler(message, source, lineno, colno, error);
//   }
// };
