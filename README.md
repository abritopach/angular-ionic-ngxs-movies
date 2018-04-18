# AngularIonicNGXSMovies

Sample project that shows how to build a Movies Catalog APP with Angular, Ionic 4, Capacitor and NGXS (State Management).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

Technologies: Angular, Ionic, Capacitor, NGXS, TypeScript.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Capacitor: Add Platforms

``` bash
    npx cap add ios
    npx cap add android
```

## Capacitor: Syncing your app
Every time you perform a build (e.g. npm run build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:

``` bash
    npx cap copy
```

## Capacitor: Open IDE to build

``` bash
    npx cap open ios
    npx cap open android
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
