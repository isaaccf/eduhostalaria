import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { IWidgetSchema, IFormSchema, IReportSchema, IAction } from 'app/tools/schema.model';
import { BusService } from 'app/tools/bus.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { IUser } from 'app/tools/user.model';
import { IOrganization } from 'app/tools/organization.model';
import { Level } from 'app/tools/message.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ab-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private organizationId;
  public isEditModalActive = false;
  public isDeletingMode = false;
  public selectedEvent;
  public events: any[];
  public filters;
  public deleteForm: FormGroup;
  public panelSchema: IWidgetSchema = {};
  public actionSchema: IWidgetSchema;
  public reportSchema: IReportSchema;
  public cardSchema: IWidgetSchema;
  public editActionsSchema: IAction[];

  constructor(private schema: SchemaService,
    private me: MeService,
    private router: Router,
    private security: SecurityService,
    private bus: BusService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getSchema();
    this.createDeleteForm();
  }

  getSchema() {
    this.schema
      .getSchema$('me_events')
      .subscribe(schemas => {
        this.actionSchema = schemas.actions;
        this.reportSchema = schemas.report;
        this.editActionsSchema = schemas.editActions;
        this.cardSchema = { header: { title: '' }, fields: this.reportSchema.fields };
      });
  }

  createDeleteForm() {
    this.deleteForm = this.fb.group({
      sendMessage: [false, Validators.required],
      sendCustomMessage: [false, Validators.required],
      customMessage: ['']
    });
  }

  onFilter(payload?) {
    let params;

    if (!payload) {
      params = this.filters;
    } else {
      params = payload;
      this.filters = payload;
    }

    this.me.filterEvents(params).subscribe((events: any[]) => {
      this.events = events;
    });
  }

  onRowAction(action) {
    const event = Object.assign({}, action.value);

    this.selectedEvent = event;

    switch (action.key) {
      case 'edit':
        this.editActionsSchema.map(button => {
          if (event.status === button.disabledStatus) {
            button.disabled = true;
          } else {
            button.disabled = false;
          }
        });
        this.isEditModalActive = true;
        break;
    }
  }

  onEditAction(key) {
    switch (key) {
      case 'edit':
        this.router.navigateByUrl(`me/events/${this.selectedEvent._id}`);
        this.isEditModalActive = false;
        break;
      case 'activate':
        this.me.changeEventStatus(this.selectedEvent, 'ACTIVE').subscribe(() => {
          this.onFilter();
        });
        this.isEditModalActive = false;
        break;
      case 'delete':
        this.isDeletingMode = true;
        break;
      case 'deactivate':
        this.me.changeEventStatus(this.selectedEvent, 'DISABLED').subscribe(() => {
          this.onFilter();
        });
        this.isEditModalActive = false;
        break;
    }
  }

  onCloseEditModal() {
    this.isDeletingMode = false;
    this.isEditModalActive = false;
  }

  onReturnFromDeletingMode() {
    this.isDeletingMode = false;
  }

  onSubmitDeleteForm() {
    this.onCloseEditModal();

    const sendMessage = this.deleteForm.get('sendMessage').value;
    const sendCustomMessage = this.deleteForm.get('sendCustomMessage').value;
    const customMessage = this.deleteForm.get('customMessage').value;

    if (!sendCustomMessage) {
      this.me.deleteEvent(this.selectedEvent, sendMessage, undefined).subscribe(() => {
        this.onFilter();
      });
    }

    if (sendCustomMessage && customMessage) {
      this.me.deleteEvent(this.selectedEvent, sendMessage, customMessage).subscribe(() => {
        this.onFilter();
      });
    }
  }

}
