# AngularIonicNGXSMovies

[![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/abritopach) [![License](https://img.shields.io/github/license/abritopach/capacitor-heatmap.svg)](https://github.com/abritopach/capacitor-heatmap/blob/master/LICENSE)

**If this project has been useful to you and you want to help me to keep contributing to the open source with projects, examples, plugins,... collaborate and buy me a coffee.**

<a href="https://www.buymeacoffee.com/h6WVj4HcD" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>

Sample project that shows how to build a Movies Catalog APP with Angular (version 13), Ionic (version 6), Capacitor and NGXS (State Management).

**IMPORTANT NOTE:** The project has been updated with the latest versions of Angular (version 17) and Ionic (version 7).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

This project has been updated following the official [Angular update guide](https://update.angular.io/).

This project shows you how to:

    * Use Capacitor in Ionic.
    * Use Capacitor Youtube Player (Works on web, android and ios).
    * Use NGXS for state management in Ionic 6.
    * Use NGXS plugins:
        * Devtools: Plugin with integration with the Redux Devtools extension.
        * Logger: A simple console log plugin to log actions as they are processed.
        * Forms: Plugin that helps to keep your forms and state in sync.
    * Show movies list.
    * Show skeleton when the movies list is being downloaded.
    * Show movie detail.
    * CRUD operations:
        * Add movie.
        * Update movie.
        * Delete movie.
    * Add movies to my favorites list.
    * Movies view mode in home: list view / card view.
    * Genre carousel for filtering movies.
    * Infinite scroll in movies list.
    * Use YouTube Data API to search movie trailer.

Technologies: Angular, Ionic, Capacitor, NGXS, TypeScript.

![Technologies](readme_resources/technologies.png "Technologies")

## App Example

![App](readme_resources/app.gif "App")

## API used in this project

You can launch the movies API in two ways:

  * [NEW] Use the following project in Deno that I created to learn & practice my skills: [Movies Rest API with Deno](https://github.com/abritopach/deno-movies-api-rest)

  * Use the option I initially used when developing the project: [JSON Server](https://github.com/typicode/json-server)


### Start movies rest API with Deno

Check out the instructions in the [repository](https://github.com/typicode/json-server)

### Start fake json server

```bash
    $ cd json-server
    $ json-server --watch db.json
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Capacitor: Add Platforms

``` bash
    $ npx cap add ios
    $ npx cap add android
```

## Capacitor: Syncing your app
Every time you perform a build (e.g. npm run build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:

``` bash
    $ npx cap copy
```

## Capacitor: Open IDE to build

``` bash
    $ npx cap open ios
    $ npx cap open android
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
