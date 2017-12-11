import { observable } from 'rxjs/symbol/observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.patch(`${this.usersUrl}/me`, aux);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any>(this.usersUrl);
  }

  disableUser(user: any): Observable<any> {
    return this.http.post(`${this.credentialsUrl}/_/dissableds`, user);
  }

  approbeUser(user: any): Observable<any> {
    return this.http.post(`${this.credentialsUrl}/_/approvals`, user);
  }

  deleteUser(user: any): Observable<any> {
    user.status = 'CANCELED';
    return this.http.patch(`${this.credentialsUrl}/_/${user._id}`, user);
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

  reInviteUser(user: any): Observable<any> {
    return this.http.post(`${this.credentialsUrl}/_/invitations/resend`, user);
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
    newAdmin.roles.push('ADMIN', 'MESTRE');
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

  getEventById(eventId) {
    return this.http.get(`${this.eventsUrl}/${eventId}`);
  }

  getEventBySlug(eventSlug) {
    return this.http.get(`${this.eventsUrl}/slug/${eventSlug}`);
  }

  postEvent(event) {
    const user = this.security.getLocalUser();
    event.freeSeats = Number(event.capacity);
    delete event.bookingsNumber;
    return this.http
      .post(this.eventsUrl, event)
      .do(x => this.log.sendEvent('events', user.name, JSON.stringify(event)));
  }

  editEvent(event) {
    delete event.pax;
    delete event.bookingsNumber;
    return this.http.patch(`${this.eventsUrl}/${event._id}`, event);
  }

  postEventFiles(eventId, files: FormData) {
    console.log(files);
    return this.http.post(`${this.eventsUrl}/${eventId}/files`, files);
  }

  postOrganizationBanner(organizationId, files: FormData) {
    return this.http.post(`${this.organizationsUrl}/${organizationId}/files`, files);
  };

  removeEventFile(eventId, fileName) {
    // TODO: Change url for file url
    // const init = url.indexOf(this.eventsUrl);
    // const path = url.substring(init);
    // return this.http.delete(path);
    return this.http.delete(`${this.eventsUrl}/${eventId}/files/${fileName}`);
  }

  removeOrganizationBanner(organizationId, fileName) {
    return this.http.delete(`${this.organizationsUrl}/${organizationId}/files/${fileName}`)
  };

  removeEvent(eventId) {
    return this.http.delete(`${this.eventsUrl}/${eventId}`);
  }

  changeEventStatus(event, status) {
    const payload = Object.assign({}, event);
    delete event.pax;
    delete event.bookingsNumber;
    payload.ownerId = event.owner._id;
    delete payload.owner;
    payload.status = status;
    return this.http.patch(`${this.eventsUrl}/${event._id}`, payload);
  }

  bookEvent(payload) {
    const user = this.security.getLocalUser();
    payload.seats = Number(payload.seats);
    return this.http
      .post(this.bookingsUrl, payload)
      .do(x => this.log.sendEvent('bookings', user.name, JSON.stringify(payload)));
  }

  bookEventGuest(payload) {
    payload.seats = Number(payload.seats);
    return this.http
      .post(`${this.credentialsUrl}/bookingregistrations`, payload)
      .do(x => this.log.sendEvent('bookings', 'bookingregistrations', JSON.stringify(payload)));
  }

  editBooking(booking) {
    return this.http.patch(`${this.bookingsUrl}/${booking._id}`, booking);
  }

  getUserById(userId) {
    return this.http.get(`${this.credentialsUrl}/_/${userId}`);
  }

  getBooking(bookingId) {
    return this.http.get(`${this.bookingsUrl}/${bookingId}`);
  }

  getBookingsByEventId(eventId) {
    return this.http.get(`${this.eventsUrl}/${eventId}/bookings`);
  }

  getBookingsByUserId() {
    return this.http.get(`${this.bookingsUrl}`);
  }

  getBookingsByEventIdAndNotStatus(eventId, status) {
    const params = new HttpParams().set('status', status);
    return this.http.get(`${this.eventsUrl}/${eventId}/bookings`, { params });
  }

  changeBookingStatus(booking, status) {
    booking.status = status;
    return this.http.patch(`${this.bookingsUrl}/${booking._id}`, booking);
  }

  filterEvents(payload) {
    let params = new HttpParams();

    Object.keys(payload).forEach(key => {
      params = params.set(key, payload[key]);
    });

    return this.http.get(`${this.eventsUrl}`, { params });
  }

  rateBooking(bookingId, payload) {
    return this.http.post(`${this.bookingsUrl}/${bookingId}/rating`, payload);
  }
}
