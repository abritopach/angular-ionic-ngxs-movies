(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pages/detail/detail.module": [
		"./src/app/pages/detail/detail.module.ts",
		"pages-detail-detail-module"
	],
	"./pages/home/home.module": [
		"./src/app/pages/home/home.module.ts",
		"pages-home-home-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
    { path: 'detail', loadChildren: './pages/detail/detail.module#DetailModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<ion-app>\n  <ion-router-outlet main animate=\"false\"></ion-router-outlet>\n</ion-app>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_store_state_movies_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app/store/state/movies.state */ "./src/app/store/state/movies.state.ts");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngxs/devtools-plugin */ "./node_modules/@ngxs/devtools-plugin/fesm5/ngxs-devtools-plugin.js");
/* harmony import */ var _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngxs/logger-plugin */ "./node_modules/@ngxs/logger-plugin/fesm5/ngxs-logger-plugin.js");
/* harmony import */ var _ngxs_form_plugin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngxs/form-plugin */ "./node_modules/@ngxs/form-plugin/fesm5/ngxs-form-plugin.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _providers_movies_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./providers/movies-service */ "./src/app/providers/movies-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// NGXS





// import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"].forRoot(),
                _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forRoot([_app_store_state_movies_state__WEBPACK_IMPORTED_MODULE_4__["MovieState"]]),
                // NgxsStoragePluginModule.forRoot(),
                _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_6__["NgxsReduxDevtoolsPluginModule"].forRoot(),
                _ngxs_logger_plugin__WEBPACK_IMPORTED_MODULE_7__["NgxsLoggerPluginModule"].forRoot(),
                _ngxs_form_plugin__WEBPACK_IMPORTED_MODULE_8__["NgxsFormPluginModule"].forRoot()
            ],
            providers: [_providers_movies_service__WEBPACK_IMPORTED_MODULE_11__["MoviesService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/providers/movies-service.ts":
/*!*********************************************!*\
  !*** ./src/app/providers/movies-service.ts ***!
  \*********************************************/
/*! exports provided: MoviesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoviesService", function() { return MoviesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MoviesService = /** @class */ (function () {
    function MoviesService(http) {
        this.http = http;
        this.URL_BASE = 'http://localhost:3000/';
    }
    MoviesService.prototype.getMovies = function (start, end) {
        return this.http
            .get(this.URL_BASE + ("movies?_start=" + start + "&_end=" + end + "&_sort=year,title&_order=desc,asc"))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000));
    };
    MoviesService.prototype.getMovie = function (title) {
        // console.log(encodeURI(this.URL_BASE + `movies?title=${title}`));
        return this.http
            .get(encodeURI(this.URL_BASE + ("movies?title=" + title)))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000));
    };
    MoviesService.prototype.addMovie = function (movie) {
        movie['id'] = Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])();
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
        // console.log('movie in addMovie', movie);
        return this.http
            .post(encodeURI(this.URL_BASE + "movies/"), movie, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000));
    };
    MoviesService.prototype.editMovie = function (movie) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
        // console.log('movie in editMovie', movie);
        return this.http
            .put(encodeURI(this.URL_BASE + ("movies/" + movie['id'])), movie, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000));
    };
    MoviesService.prototype.deleteMovie = function (movie) {
        // console.log('movie in deleteMovie', movie);
        return this.http
            .delete(encodeURI(this.URL_BASE + ("movies/" + movie['id'])))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000));
    };
    MoviesService.prototype.filterMovies = function (filters) {
        console.log('filterMovies in movies-services', filters);
        var strFilters = this.checkFilters(filters);
        console.log('strFilters', strFilters);
        return this.http
            .get(this.URL_BASE + ("movies" + strFilters + "_sort=year,title&_order=desc,asc&_limit=20"))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000));
    };
    MoviesService.prototype.checkFilters = function (filters) {
        var strFilters = '';
        strFilters += typeof filters['genre'] !== 'undefined' ? "?genre=" + filters.genre + "&" : '?';
        strFilters += typeof filters['years'] !== 'undefined' ? "year_gte=" + filters.years.lower + "&year_lte=" + filters.years.upper + "&" : '';
        return strFilters;
    };
    MoviesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], MoviesService);
    return MoviesService;
}());



/***/ }),

/***/ "./src/app/store/actions/movies.actions.ts":
/*!*************************************************!*\
  !*** ./src/app/store/actions/movies.actions.ts ***!
  \*************************************************/
/*! exports provided: FetchMovies, SelectedMovie, AddMovie, EditMovie, DeleteMovie, FilterMovies, SaveFilterMovies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchMovies", function() { return FetchMovies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectedMovie", function() { return SelectedMovie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMovie", function() { return AddMovie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMovie", function() { return EditMovie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteMovie", function() { return DeleteMovie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterMovies", function() { return FilterMovies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaveFilterMovies", function() { return SaveFilterMovies; });
var FetchMovies = /** @class */ (function () {
    function FetchMovies(payload) {
        this.payload = payload;
    }
    FetchMovies.type = '[Movies] Fetch movies';
    return FetchMovies;
}());

var SelectedMovie = /** @class */ (function () {
    function SelectedMovie(payload) {
        this.payload = payload;
    }
    SelectedMovie.type = '[Movies] Selected movie';
    return SelectedMovie;
}());

var AddMovie = /** @class */ (function () {
    function AddMovie(payload) {
        this.payload = payload;
    }
    AddMovie.type = '[Movies] Add movie';
    return AddMovie;
}());

var EditMovie = /** @class */ (function () {
    function EditMovie(payload) {
        this.payload = payload;
    }
    EditMovie.type = '[Movies] Edit movie';
    return EditMovie;
}());

var DeleteMovie = /** @class */ (function () {
    function DeleteMovie(payload) {
        this.payload = payload;
    }
    DeleteMovie.type = '[Movies] Delete movie';
    return DeleteMovie;
}());

var FilterMovies = /** @class */ (function () {
    function FilterMovies(payload) {
        this.payload = payload;
    }
    FilterMovies.type = '[Movies] Filter movies';
    return FilterMovies;
}());

var SaveFilterMovies = /** @class */ (function () {
    function SaveFilterMovies(payload) {
        this.payload = payload;
    }
    SaveFilterMovies.type = '[Movies] Save Filter movies';
    return SaveFilterMovies;
}());



/***/ }),

/***/ "./src/app/store/state/movies.state.ts":
/*!*********************************************!*\
  !*** ./src/app/store/state/movies.state.ts ***!
  \*********************************************/
/*! exports provided: MoviesStateModel, MovieState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoviesStateModel", function() { return MoviesStateModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieState", function() { return MovieState; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../actions/movies.actions */ "./src/app/store/actions/movies.actions.ts");
/* harmony import */ var _providers_movies_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/movies-service */ "./src/app/providers/movies-service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MoviesStateModel = /** @class */ (function () {
    function MoviesStateModel() {
    }
    return MoviesStateModel;
}());

var MovieState = /** @class */ (function () {
    function MovieState(moviesService) {
        this.moviesService = moviesService;
    }
    MovieState.getMovies = function (state) {
        return state.movies;
    };
    MovieState.prototype.fetchMovies = function (_a, _b) {
        var getState = _a.getState, setState = _a.setState, patchState = _a.patchState;
        var payload = _b.payload;
        // console.log('fetchMovies payload', payload);
        var start = payload.start, end = payload.end;
        return this.moviesService.getMovies(start, end).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (result) {
            // console.log('fetchMovies result', result);
            var state = getState();
            // console.log('state', state);
            setState(__assign({}, state, { movies: state.movies.concat(result) }));
        }, function (error) {
            console.log('error', error.message);
        }));
    };
    MovieState.prototype.selectedMovie = function (_a, _b) {
        var getState = _a.getState, setState = _a.setState;
        var payload = _b.payload;
        // console.log('selectedMovie payload', payload);
        var title = payload.title;
        return this.moviesService.getMovie(title).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (result) {
            // console.log('result selectedMovie', result);
            var state = getState();
            setState(__assign({}, state, { selectedMovie: __assign({}, result[0]) }));
        }));
    };
    MovieState.prototype.addMovie = function (_a, _b) {
        var getState = _a.getState, setState = _a.setState;
        var payload = _b.payload;
        // console.log('payload', payload);
        return this.moviesService.addMovie(payload).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (result) {
            // console.log('result addMovie', result);
            var state = getState();
            setState(__assign({}, state, { movies: [result].concat(state.movies) }));
        }));
    };
    MovieState.prototype.editMovie = function (_a, _b) {
        var getState = _a.getState, setState = _a.setState;
        var payload = _b.payload;
        // console.log('payload', payload);
        return this.moviesService.editMovie(payload).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (result) {
            // console.log('result editMovie', result);
            var state = getState();
            var movies = state.movies;
            movies[result['index']] = result;
            setState(__assign({}, state, { movies: movies.slice() }));
            // state.movies[result['index']] = {...result};
        }));
    };
    MovieState.prototype.deleteMovie = function (_a, _b) {
        var getState = _a.getState, setState = _a.setState;
        var payload = _b.payload;
        // console.log('payload', payload);
        return this.moviesService.deleteMovie(payload).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (result) {
            // console.log('result deleteMovie', result);
            var state = getState();
            setState(__assign({}, state, { movies: state.movies.filter(function (movie) { return movie.title !== payload.title; }) }));
        }));
    };
    MovieState.prototype.filterMovies = function (_a, _b) {
        var getState = _a.getState, setState = _a.setState;
        var payload = _b.payload;
        return this.moviesService.filterMovies(payload).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (result) {
            // console.log('filterMovies result', result);
            var state = getState();
            setState(__assign({}, state, { movies: result.slice() }));
        }, function (error) {
            console.log('error', error.message);
        }));
    };
    MovieState.prototype.saveFilterMovies = function (_a, _b) {
        var getState = _a.getState, setState = _a.setState;
        var payload = _b.payload;
        // console.log('payload saveFilterMovies', payload);
        var state = getState();
        setState(__assign({}, state, { filter: __assign({}, payload) }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__["FetchMovies"], { cancelUncompleted: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MovieState.prototype, "fetchMovies", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__["SelectedMovie"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MovieState.prototype, "selectedMovie", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__["AddMovie"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MovieState.prototype, "addMovie", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__["EditMovie"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MovieState.prototype, "editMovie", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__["DeleteMovie"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MovieState.prototype, "deleteMovie", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__["FilterMovies"], { cancelUncompleted: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MovieState.prototype, "filterMovies", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_actions_movies_actions__WEBPACK_IMPORTED_MODULE_2__["SaveFilterMovies"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MovieState.prototype, "saveFilterMovies", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MoviesStateModel]),
        __metadata("design:returntype", void 0)
    ], MovieState, "getMovies", null);
    MovieState = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'catalog',
            defaults: {
                movies: [],
                selectedMovie: null,
                movieForm: {
                    model: null,
                    dirty: false,
                    status: '',
                    errors: {}
                },
                filter: {
                    genre: '',
                    years: {
                        lower: 1900,
                        upper: new Date().getFullYear()
                    }
                }
            }
        }),
        __metadata("design:paramtypes", [_providers_movies_service__WEBPACK_IMPORTED_MODULE_3__["MoviesService"]])
    ], MovieState);
    return MovieState;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/adrian/Documents/angular/angular-ionic-ngxs-movies/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map