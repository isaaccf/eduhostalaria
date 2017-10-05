import { observable } from 'rxjs/symbol/observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IOrganization } from 'app/tools/organization.model';
import { SecurityService } from 'app/tools/security.service';
import { LoggingService } from 'app/tools/analytics.service';

@Injectable()
export class MeService {
  private organizationsUrl = '_/organizations';
  private usersUrl = '_/users';
  private eventsUrl = '_/events';
  private bookingsUrl = '_/bookings';
  private credentialsUrl = 'credentials';

  constructor(private http: HttpClient, private security: SecurityService, private log: LoggingService) { }

  getOrganizationsCount(): Observable<number> {
    return this.http
      .get<any>(`${this.organizationsUrl}/count`)
      .map(res => res.data);
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<any>(`${this.usersUrl}/count`)
      .map(res => res.data);
  }

  getAdministratedOrganization(id): Observable<IOrganization> {
    return this.http
      .get<IOrganization>(`${this.organizationsUrl}/${id}`);
  }

  changePassword(password: any): Observable<any> {
    return this.http.patch(`${this.credentialsUrl}/`, password);
  }

  editProfile(userProfile: any): Observable<any> {
    const user = this.security.getLocalUser();
    const aux = Object.assign(user, userProfile);
    return this.http
      .patch(`${this.usersUrl}/me`, aux);
  }

  getUsers(): Observable<any[]> {
    return this.http
      .get<any>(this.usersUrl);
  }

  disableUser(user: any): Observable<any> {
    return this.http
      .post(`${this.credentialsUrl}/_/dissableds`, user);
  }

  approbeUser(user: any): Observable<any> {
    return this.http
      .post(`${this.credentialsUrl}/_/approvals`, user);
  }

  deleteUser(user: any): Observable<any> {
    return this.http
      .delete(`${this.credentialsUrl}/_/${user._id}`);
  }

  inviteUser(newUser: any): Observable<any> {
    const user = this.security.getLocalUser();
    newUser.roles = [newUser.role];
    newUser.organizationId = user.organizationId;
    delete newUser.role;
    return this.http
      .post(`${this.credentialsUrl}/_/invitations`, newUser)
      .do(x => this.log.sendEvent('invitations', user.name, JSON.stringify(newUser)));
  }

  getOrganizations(): Observable<any[]> {
    return this.http
      .get<any>(this.organizationsUrl)
      .map(data => data.map(d => {
        const org = { _id: d._id, name: d.name, admin: { name: '', email: '', userId: '' } };
        return org;
      }))
  }

  getOrganizationAdmin(organizationId: number): Observable<any> {
    const params = new HttpParams().set('role', 'ADMIN');
    const url = `${this.organizationsUrl}/${organizationId}/users`;
    return this.http.get<any>(url, { params });
  }

  setOrganizationAdmin(newAdmin) {
    newAdmin.roles = [];
    newAdmin.roles.push('ADMIN');
    return this.http
      .post(`${this.credentialsUrl}/_/invitations`, newAdmin);
  }

  postOrganization(newOrganization) {
    return this.http
      .post(this.organizationsUrl, newOrganization);
  }

  deleteOrganization(oldOrganization) {
    return this.http
      .delete(`${this.organizationsUrl}/${oldOrganization._id}`);
  }

  updateOrganization(organization: IOrganization): Observable<IOrganization> {
    return this.http
      .patch<IOrganization>(`${this.organizationsUrl}`, organization)
      .do(res => this.security.setLocalOrganization(organization));
  }

  getEvents(): Observable<any[]> {
    return this.http
      .get<any>(this.eventsUrl);
  }

  getEventById(eventId) {
    return this.http.get(`${this.eventsUrl}/${eventId}`);
  }

  getEventBySlug(eventSlug) {
    return this.http.get(`${this.eventsUrl}/slug/${eventSlug}`);
  }

  postEvent(event) {
    const user = this.security.getLocalUser();
    delete event.bookingsNumber;
    return this.http
      .post(this.eventsUrl, event)
      .do(x => this.log.sendEvent('events', user.name, JSON.stringify(event)));
  }

  editEvent(event) {
    delete event.bookingsNumber;
    return this.http.patch(`${this.eventsUrl}/${event._id}`, event);
  }

  postEventFiles(eventId, files: FormData) {
    return this.http.post(`${this.eventsUrl}/${eventId}/files`, files);
  }

  removeFile(eventId, fileName) {
    return this.http.delete(`${this.eventsUrl}/${eventId}/files/${fileName}`);
  }

  removeEvent(eventId) {
    return this.http.delete(`${this.eventsUrl}/${eventId}`);
  }

  changeEventStatus(event, status) {
    const payload = Object.assign({}, event);
    delete event.bookingsNumber;
    payload.ownerId = event.owner._id;
    delete payload.owner;
    payload.status = status;
    return this.http.patch(`${this.eventsUrl}/${event._id}`, payload);
  }

  bookEvent(payload) {
    const user = this.security.getLocalUser();
    return this.http
      .post(this.bookingsUrl, payload)
      .do(x => this.log.sendEvent('bookings', user.name, JSON.stringify(payload)));
  }

  bookEventGuest(payload) {
    return this.http
      .post(`${this.credentialsUrl}/bookingregistrations`, payload)
      .do(x => this.log.sendEvent('bookings', 'bookingregistrations', JSON.stringify(payload)));
  }

  getUserById(userId) {
    return this.http.get(`${this.credentialsUrl}/_/${userId}`);
  }

  getBookingsByEventId(eventId) {
    return this.http.get(`${this.eventsUrl}/${eventId}/bookings`);
  }

  changeBookingStatus(booking, status) {
    booking.status = status;
    return this.http.patch(`${this.bookingsUrl}/${booking._id}`, booking);
  }

  getBookingsByUserId() {
    return this.http.get(`${this.bookingsUrl}`);
  }

}
