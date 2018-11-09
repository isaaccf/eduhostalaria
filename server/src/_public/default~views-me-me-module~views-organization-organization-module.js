(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-me-me-module~views-organization-organization-module"],{

/***/ "./src/app/views/me/me.service.ts":
/*!****************************************!*\
  !*** ./src/app/views/me/me.service.ts ***!
  \****************************************/
/*! exports provided: MeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeService", function() { return MeService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var app_tools_analytics_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/analytics.service */ "./src/app/tools/analytics.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MeService = /** @class */ (function () {
    function MeService(http, security, log) {
        this.http = http;
        this.security = security;
        this.log = log;
        this.organizationsUrl = '_/organizations';
        this.usersUrl = '_/users';
        this.eventsUrl = '_/events';
        this.bookingsUrl = '_/bookings';
        this.credentialsUrl = 'credentials';
    }
    MeService.prototype.getOrganizationsCount = function () {
        return this.http
            .get(this.organizationsUrl + "/count")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.data; }));
    };
    MeService.prototype.getUsersCount = function () {
        return this.http
            .get(this.usersUrl + "/count")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) { return res.data; }));
    };
    MeService.prototype.getAdministratedOrganization = function (id) {
        return this.http
            .get(this.organizationsUrl + "/" + id);
    };
    MeService.prototype.changePassword = function (password) {
        return this.http.patch(this.credentialsUrl + "/", password);
    };
    MeService.prototype.editProfile = function (userProfile) {
        var user = this.security.getLocalUser();
        var aux = Object.assign(user, userProfile);
        return this.http.patch(this.usersUrl + "/me", aux);
    };
    MeService.prototype.getUsers = function (name, status) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]();
        if (name) {
            params = params.set('name', name);
        }
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get(this.usersUrl, { params: params });
    };
    MeService.prototype.disableUser = function (user) {
        return this.http.post(this.credentialsUrl + "/_/dissableds", user);
    };
    MeService.prototype.approbeUser = function (user) {
        return this.http.post(this.credentialsUrl + "/_/approvals", user);
    };
    MeService.prototype.removeUserDefinitively = function (userId) {
        return this.http.delete(this.usersUrl + "/" + userId);
    };
    MeService.prototype.deleteUser = function () {
        return this.http.delete(this.usersUrl + "/me");
    };
    MeService.prototype.inviteUser = function (newUser) {
        var _this = this;
        var user = this.security.getLocalUser();
        newUser.roles = [newUser.role];
        newUser.organizationId = user.organizationId;
        delete newUser.role;
        return this.http
            .post(this.credentialsUrl + "/_/invitations", newUser)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (x) { return _this.log.sendEvent('invitations', user.name, JSON.stringify(newUser)); }));
    };
    MeService.prototype.reInviteUser = function (user) {
        return this.http.post(this.credentialsUrl + "/_/invitations/resend", user);
    };
    MeService.prototype.getOrganizations = function () {
        return this.http
            .get(this.organizationsUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) { return data.map(function (d) {
            var org = { _id: d._id, name: d.name, admin: { name: '', email: '', userId: '' } };
            return org;
        }); }));
    };
    MeService.prototype.getOrganizationAdmin = function (organizationId) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]().set('role', 'ADMIN');
        var url = this.organizationsUrl + "/" + organizationId + "/users";
        return this.http.get(url, { params: params });
    };
    MeService.prototype.setOrganizationAdmin = function (newAdmin) {
        newAdmin.roles = [];
        newAdmin.roles.push('ADMIN', 'MESTRE');
        return this.http
            .post(this.credentialsUrl + "/_/invitations", newAdmin);
    };
    MeService.prototype.postOrganization = function (newOrganization) {
        return this.http
            .post(this.organizationsUrl, newOrganization);
    };
    MeService.prototype.deleteOrganization = function (oldOrganization) {
        return this.http
            .delete(this.organizationsUrl + "/" + oldOrganization._id);
    };
    MeService.prototype.updateOrganization = function (organization) {
        var _this = this;
        return this.http
            .patch("" + this.organizationsUrl, organization)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) { return _this.security.setLocalOrganization(organization); }));
    };
    MeService.prototype.getEventById = function (eventId) {
        return this.http.get(this.eventsUrl + "/" + eventId);
    };
    MeService.prototype.getEventBySlug = function (eventSlug) {
        return this.http.get(this.eventsUrl + "/slug/" + eventSlug);
    };
    MeService.prototype.postEvent = function (event) {
        var _this = this;
        var user = this.security.getLocalUser();
        event.freeSeats = Number(event.capacity);
        delete event.bookingsNumber;
        return this.http
            .post(this.eventsUrl, event)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (x) { return _this.log.sendEvent('events', user.name, JSON.stringify(event)); }));
    };
    MeService.prototype.editEvent = function (event) {
        delete event.pax;
        delete event.bookingsNumber;
        return this.http.patch(this.eventsUrl + "/" + event._id, { event: event });
    };
    MeService.prototype.postEventFiles = function (eventId, files) {
        return this.http.post(this.eventsUrl + "/" + eventId + "/files", files);
    };
    MeService.prototype.postOrganizationBanner = function (organizationId, files) {
        return this.http.post(this.organizationsUrl + "/" + organizationId + "/files", files);
    };
    ;
    MeService.prototype.removeEventFile = function (eventId, fileName) {
        // TODO: Change url for file url
        // const init = url.indexOf(this.eventsUrl);
        // const path = url.substring(init);
        // return this.http.delete(path);
        return this.http.delete(this.eventsUrl + "/" + eventId + "/files/" + fileName);
    };
    MeService.prototype.removeOrganizationBanner = function (organizationId, fileName) {
        return this.http.delete(this.organizationsUrl + "/" + organizationId + "/files/" + fileName);
    };
    ;
    MeService.prototype.removeEvent = function (eventId) {
        return this.http.delete(this.eventsUrl + "/" + eventId);
    };
    MeService.prototype.changeEventStatus = function (event, status) {
        var payload = {
            event: event
        };
        delete payload.event.pax;
        delete payload.event.bookingsNumber;
        if (event.owner && event.owner._id) {
            payload.event.ownerId = event.owner._id;
            delete payload.event.owner;
        }
        payload.event.status = status;
        return this.http.patch(this.eventsUrl + "/" + event._id, payload);
    };
    MeService.prototype.cancelEvent = function (event, sendMessage, customMessage) {
        event.status = 'CANCELED';
        delete event.pax;
        delete event.bookingsNumber;
        if (event.owner && event.owner._id) {
            event.ownerId = event.owner._id;
            delete event.owner;
        }
        return this.http.patch(this.eventsUrl + "/" + event._id, { event: event, sendMessage: sendMessage, customMessage: customMessage });
    };
    MeService.prototype.deleteEvent = function (eventId) {
        return this.http.delete(this.eventsUrl + "/" + eventId);
    };
    MeService.prototype.bookEvent = function (payload) {
        var _this = this;
        var user = this.security.getLocalUser();
        payload.seats = Number(payload.seats);
        return this.http
            .post(this.bookingsUrl, payload)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (x) { return _this.log.sendEvent('bookings', user.name, JSON.stringify(payload)); }));
    };
    MeService.prototype.bookEventGuest = function (payload) {
        var _this = this;
        payload.seats = Number(payload.seats);
        return this.http
            .post(this.credentialsUrl + "/bookingregistrations", payload)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (x) { return _this.log.sendEvent('bookings', 'bookingregistrations', JSON.stringify(payload)); }));
    };
    MeService.prototype.editBooking = function (booking) {
        return this.http.patch(this.bookingsUrl + "/" + booking._id, booking);
    };
    MeService.prototype.getUserById = function (userId) {
        return this.http.get(this.credentialsUrl + "/_/" + userId);
    };
    MeService.prototype.getBooking = function (bookingId) {
        return this.http.get(this.bookingsUrl + "/" + bookingId);
    };
    MeService.prototype.getBookingsByEventId = function (eventId) {
        return this.http.get(this.eventsUrl + "/" + eventId + "/bookings");
    };
    MeService.prototype.getBookingsByUserId = function (payload) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]();
        if (payload) {
            Object.keys(payload).forEach(function (key) {
                params = params.set(key, payload[key]);
            });
        }
        return this.http.get("" + this.bookingsUrl, { params: params });
    };
    MeService.prototype.getBookingsByEventIdAndNotStatus = function (eventId, status) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]().set('status', status);
        return this.http.get(this.eventsUrl + "/" + eventId + "/bookings", { params: params });
    };
    MeService.prototype.changeBookingStatus = function (booking, status) {
        booking.status = status;
        return this.http.patch(this.bookingsUrl + "/" + booking._id, booking);
    };
    MeService.prototype.updateBooking = function (booking) {
        return this.http.patch(this.bookingsUrl + "/" + booking._id, booking);
    };
    MeService.prototype.filterEvents = function (payload) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]();
        Object.keys(payload).forEach(function (key) {
            params = params.set(key, payload[key]);
        });
        return this.http.get("" + this.eventsUrl, { params: params });
    };
    MeService.prototype.rateBooking = function (bookingId, payload) {
        return this.http.post(this.bookingsUrl + "/" + bookingId + "/rating", payload);
    };
    MeService.prototype.uploadThumbnail = function (eventId, base64Thumbnail, type) {
        return this.http.post(this.eventsUrl + "/" + eventId + "/thumbnail", { thumbnail: base64Thumbnail, type: type });
    };
    MeService.prototype.deleteThumbnail = function (eventId) {
        return this.http.delete(this.eventsUrl + "/" + eventId + "/thumbnail");
    };
    MeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], app_tools_security_service__WEBPACK_IMPORTED_MODULE_2__["SecurityService"], app_tools_analytics_service__WEBPACK_IMPORTED_MODULE_3__["LoggingService"]])
    ], MeService);
    return MeService;
}());



/***/ }),

/***/ "./src/app/views/organization/organization.service.ts":
/*!************************************************************!*\
  !*** ./src/app/views/organization/organization.service.ts ***!
  \************************************************************/
/*! exports provided: OrganizationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizationService", function() { return OrganizationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrganizationService = /** @class */ (function () {
    function OrganizationService(http, schemaService) {
        this.http = http;
        this.schemaService = schemaService;
        this.organizationsUrl = 'home/organizations';
    }
    OrganizationService.prototype.getOrganizationBySlug = function (slug) {
        return this.http
            .get(this.organizationsUrl + "/" + slug);
    };
    OrganizationService.prototype.getEventsByOrganizationId = function (id) {
        return this.http.get(this.organizationsUrl + "/" + id + "/events");
    };
    OrganizationService.prototype.getSchemaValues = function (form, target) {
        return this.schemaService.populateDefaultValues(form, target);
    };
    OrganizationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__["SchemaService"]])
    ], OrganizationService);
    return OrganizationService;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-me-me-module~views-organization-organization-module.js.map