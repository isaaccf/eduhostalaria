(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-home-home-module"],{

/***/ "./src/app/views/home/home.module.ts":
/*!*******************************************!*\
  !*** ./src/app/views/home/home.module.ts ***!
  \*******************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_components_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/components/components.module */ "./src/app/tools/components/components.module.ts");
/* harmony import */ var app_views_home_home_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/views/home/home.service */ "./src/app/views/home/home.service.ts");
/* harmony import */ var _home_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home.routing */ "./src/app/views/home/home.routing.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/home.component */ "./src/app/views/home/home/home.component.ts");
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _home_routing__WEBPACK_IMPORTED_MODULE_4__["HomeRoutingModule"],
                app_tools_components_components_module__WEBPACK_IMPORTED_MODULE_2__["ComponentsModule"]
            ],
            declarations: [_home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"]],
            providers: [app_views_home_home_service__WEBPACK_IMPORTED_MODULE_3__["HomeService"]],
            exports: [],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NO_ERRORS_SCHEMA"]]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/views/home/home.routing.ts":
/*!********************************************!*\
  !*** ./src/app/views/home/home.routing.ts ***!
  \********************************************/
/*! exports provided: HomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_views_home_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/views/home/home/home.component */ "./src/app/views/home/home/home.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: app_views_home_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"],
        data: { name: 'home', title: 'Hostalaría' }
    }];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/home/home.service.ts":
/*!********************************************!*\
  !*** ./src/app/views/home/home.service.ts ***!
  \********************************************/
/*! exports provided: HomeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeService", function() { return HomeService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeService = /** @class */ (function () {
    function HomeService(http) {
        this.http = http;
        this.url = 'home';
    }
    HomeService.prototype.getAllOrganizations = function () {
        return this.http
            .get(this.url + "/organizations");
    };
    HomeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], HomeService);
    return HomeService;
}());



/***/ }),

/***/ "./src/app/views/home/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/home/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-dashboard [schemas]=\"widgets\">\r\n</ab-dashboard>\r\n"

/***/ }),

/***/ "./src/app/views/home/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/home/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_views_home_home_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/views/home/home.service */ "./src/app/views/home/home.service.ts");
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
    function HomeComponent(home, schema) {
        this.home = home;
        this.schema = schema;
        this.widgets = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schema
            .getSchema$('home').subscribe(function (schema) {
            _this.schemas = schema;
            _this.home
                .getAllOrganizations()
                .subscribe(function (organizations) { return _this.createWidgets(organizations); });
        });
    };
    HomeComponent.prototype.createWidgets = function (organizations) {
        var _this = this;
        this.widgets = [];
        organizations.forEach(function (organization) {
            var organizationWidget = JSON.parse(JSON.stringify(_this.schemas));
            _this.pupulateWidget(organizationWidget, organization);
            _this.widgets.push(organizationWidget);
        });
    };
    HomeComponent.prototype.pupulateWidget = function (widget, target) {
        // To Do: autopopulate using reflection...)
        widget.header.title = this.schema.valueByPath(target, 'name');
        widget.header.subtitle = this.schema.valueByPath(target, 'slogan');
        widget.actions[0].label = "Ver oferta centro";
        widget.actions[0].link = "/org/" + this.schema.valueByPath(target, 'slug');
        widget.image = "assets/images/" + this.schema.valueByPath(target, 'slug') + ".jpg";
        widget.type = 'card';
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/views/home/home/home.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [app_views_home_home_service__WEBPACK_IMPORTED_MODULE_2__["HomeService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__["SchemaService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-home-home-module.js.map