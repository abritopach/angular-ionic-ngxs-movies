(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-home-home-module"],{

/***/ "./src/app/pages/home/home-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/home/home-routing.module.ts ***!
  \***************************************************/
/*! exports provided: HomeComponentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponentRoutingModule", function() { return HomeComponentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home */ "./src/app/pages/home/home.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _home__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    }
];
var HomeComponentRoutingModule = /** @class */ (function () {
    function HomeComponentRoutingModule() {
    }
    HomeComponentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HomeComponentRoutingModule);
    return HomeComponentRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/home/home.html":
/*!**************************************!*\
  !*** ./src/app/pages/home/home.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar color='primary'>\n      <ion-title>Movies List</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <ion-item class=\"item-info\">\n      <h2>Sample project that shows how to build a Movies Catalog APP with Angular, Ionic 4, Capacitor and NGXS (State Management).</h2>\n  </ion-item>\n\n  <!-- Movies List. -->\n  <ion-list>\n    <ion-item *ngFor=\"let movie of movies\" detail=\"true\" tappable routerLink=\"/detail/{{ movie.title }}\">\n      <ion-thumbnail slot=\"start\">\n        <img [src]=\"movie.poster\" alt=\"\">\n      </ion-thumbnail>\n      <ion-label>\n        <h2>{{ movie.title }}</h2>\n        <h3><ion-icon name=\"calendar\" color=\"primary\" slot=\"start\"></ion-icon>{{ movie.year }}</h3>\n        <h4>{{ movie.notes }}</h4>\n      </ion-label>\n      <ion-note slot=\"end\">\n      </ion-note>  \n    </ion-item>\n  </ion-list> \n  \n  <!--\n  <ion-list>\n    <ion-item *ngFor=\"let i of items\">{{i}}</ion-item>\n  </ion-list>\n  -->\n\n  <!-- Infinite Scroll. -->\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"doInfinite($event)\">\n    <ion-infinite-scroll-content\n      loadingSpinner=\"bubbles\"\n      loadingText=\"Loading more movies...\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar color=\"primary\">\n        <ion-title>© {{ currentYear }} Adrián Brito Pacheco</ion-title>\n        <ion-buttons slot=\"end\">\n          <div class=\"github-button\"><iframe allowtransparency=\"true\" scrolling=\"no\" frameborder=\"0\" src=\"https://buttons.github.io/buttons.html#href=https%3A%2F%2Fgithub.com%2Fabritopach%2Fangular-ionic-master-detail&amp;title=&amp;aria-label=Star%20abritopach%2Fangular-ionic-master-detail%20on%20GitHub&amp;data-icon=octicon-star&amp;data-text=Star\" style=\"width: 50px; height: 20px; border: none;\"></iframe></div>\n          <div class=\"github-button\"><iframe allowtransparency=\"true\" scrolling=\"no\" frameborder=\"0\" src=\"https://buttons.github.io/buttons.html#href=https%3A%2F%2Fgithub.com%2Fabritopach&amp;title=&amp;aria-label=Follow%20%40abritopach%20on%20GitHub&amp;data-text=GitHub\" style=\"width: 67px; height: 20px; border: none;\"></iframe></div>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/pages/home/home.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home */ "./src/app/pages/home/home.ts");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/pages/home/home-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_4__["HomeComponentRoutingModule"]
            ],
            declarations: [_home__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"]],
            entryComponents: [_home__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"]],
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/pages/home/home.scss":
/*!**************************************!*\
  !*** ./src/app/pages/home/home.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".item-info {\n  padding: 5px;\n  color: darkgray; }\n\n.github-button {\n  width: 49px;\n  height: 20px;\n  padding-right: 5px;\n  display: inline; }\n"

/***/ }),

/***/ "./src/app/pages/home/home.ts":
/*!************************************!*\
  !*** ./src/app/pages/home/home.ts ***!
  \************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _providers_movies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/movies-service */ "./src/app/providers/movies-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(moviesService) {
        var _this = this;
        this.moviesService = moviesService;
        this.movies = [];
        this.items = [];
        this.start = 0;
        this.end = 20;
        this.moviesService.getMovies(this.start, this.end)
            .subscribe(function (data) {
            console.log(data);
            _this.movies = data;
        }, function (error) {
            console.log(error);
        });
        /*
        for (let i = 0; i < 30; i++) {
          this.items.push( this.items.length );
        }
        console.log('items', this.items);
        */
    }
    HomeComponent.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        console.log(infiniteScroll);
        this.start = this.end;
        this.end += 20;
        this.moviesService.getMovies(this.start, this.end)
            .subscribe(function (data) {
            console.log(data);
            setTimeout(function () {
                console.log('Async operation has ended');
                _this.movies = _this.movies.concat(data);
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            }, 500);
        }, function (error) {
            console.log(error);
            infiniteScroll.complete();
        });
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-home',
            template: __webpack_require__(/*! ./home.html */ "./src/app/pages/home/home.html"),
            styles: [__webpack_require__(/*! ./home.scss */ "./src/app/pages/home/home.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_providers_movies_service__WEBPACK_IMPORTED_MODULE_1__["MoviesService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-home-home-module.js.map