(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-messages-messages-module"],{

/***/ "./src/app/views/messages/messages.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/messages/messages.module.ts ***!
  \***************************************************/
/*! exports provided: MessagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesModule", function() { return MessagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/views/messages/messages/messages.component.ts");
/* harmony import */ var app_tools_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/components/components.module */ "./src/app/tools/components/components.module.ts");
/* harmony import */ var app_views_messages_messages_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/views/messages/messages.routing */ "./src/app/views/messages/messages.routing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                app_views_messages_messages_routing__WEBPACK_IMPORTED_MODULE_4__["MessagesRoutingModule"],
                app_tools_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"]
            ],
            declarations: [_messages_messages_component__WEBPACK_IMPORTED_MODULE_2__["MessagesComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]]
        })
    ], MessagesModule);
    return MessagesModule;
}());



/***/ }),

/***/ "./src/app/views/messages/messages.routing.ts":
/*!****************************************************!*\
  !*** ./src/app/views/messages/messages.routing.ts ***!
  \****************************************************/
/*! exports provided: MessagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesRoutingModule", function() { return MessagesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/views/messages/messages/messages.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _messages_messages_component__WEBPACK_IMPORTED_MODULE_2__["MessagesComponent"],
        data: { name: 'messages', title: 'Mensaxes' }
    }];
var MessagesRoutingModule = /** @class */ (function () {
    function MessagesRoutingModule() {
    }
    MessagesRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MessagesRoutingModule);
    return MessagesRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/messages/messages/messages.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/views/messages/messages/messages.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-timeline *ngIf=\"schemas && schemas.timeline\"\n             [schema]=\"schemas.timeline\">\n</ab-timeline>\n"

/***/ }),

/***/ "./src/app/views/messages/messages/messages.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/messages/messages/messages.component.ts ***!
  \***************************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_tools_messages_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/messages.service */ "./src/app/tools/messages.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(bus, messages, schema) {
        this.bus = bus;
        this.messages = messages;
        this.schema = schema;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schema
            .getSchema$('messages')
            .subscribe(function (schema) {
            _this.schemas = schema;
            _this.schemas.timeline.events = _this.messages.populateEventsFromMessages();
        });
    };
    MessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-messages',
            template: __webpack_require__(/*! ./messages.component.html */ "./src/app/views/messages/messages/messages.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [app_tools_bus_service__WEBPACK_IMPORTED_MODULE_1__["BusService"],
            app_tools_messages_service__WEBPACK_IMPORTED_MODULE_2__["MessagesService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_3__["SchemaService"]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-messages-messages-module.js.map