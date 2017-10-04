import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { BusService } from 'app/tools/bus.service';
import { IFormSchema, IWidgetSchema } from 'app/tools/schema.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from 'app/tools/message.model';

@Component({
  selector: 'ab-event',
  templateUrl: './event.component.html',
  styles: []
})
export class EventComponent implements OnInit {

  public formKey: 'create' | 'edit' = 'create';
  public panelSchema: IWidgetSchema;
  public formSchema: IFormSchema;
  public organization: any;
  public event: any;

  constructor(private schema: SchemaService,
    private route: ActivatedRoute,
    private me: MeService,
    private security: SecurityService,
    private bus: BusService,
    private router: Router) { }

  ngOnInit() {
    this.organization = this.security.getLocalOrganization();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.formKey = 'edit';
        this.me.getEventById(params['id']).subscribe((ev: any) => {
          this.event = ev;
          this.getSchemas();
        });
      } else {
        this.getSchemas();
      }
    });
  }

  getSchemas() {
    this.schema
      .getSchema$('me_event')
      .subscribe(schemas => {
        this.panelSchema = schemas;
        this.formSchema = schemas[this.formKey];
        if (this.event) {
          this.panelSchema.header.title = `Editar evento - ${this.event.name}`;
          this.panelSchema.header.subtitle = 'Editar a información do evento';
          this.schema.populateDefaultValues(this.formSchema, this.event);
          this.formSchema.controls[0].defaultValue = new Date(this.event.date).toISOString().slice(0, 10);
        } else {
          this.schema.populateDefaultValues(this.formSchema, this.organization);
        }
      });
  }

  onSend(data) {
    this.transformDate(data);
    if (this.formKey === 'create') {
      this.me.postEvent(data).subscribe(events => {
        this.bus.emit({ level: Level.SUCCESS, text: 'Oferta creada con éxito', code: '' });
      });
    }
    if (this.formKey === 'edit') {
      this.updateEvent(data);
      this.me.editEvent(this.event).subscribe(d => {
        data.ownerId = this.event.ownerId;
        this.bus.emit({ level: Level.SUCCESS, text: 'Oferta editada con éxito', code: '' });
      });
    }
    this.router.navigateByUrl('me/events');
  }

  updateEvent(data) {
    Object.keys(data).map(key => {
      this.event[key] = data[key];
    });
  }

  transformDate(event) {
    const dateArr = event.date.split('-');
    const year = dateArr[0];
    const month = dateArr[1] - 1;
    const day = dateArr[2];
    let hour = 12;
    event.date = new Date(year, month, day, hour, 0, 0, 0);
    if (event.shift === 'Diurno') {
      hour = 14;
    } else {
      hour = 21;
    }
    event['time'] = new Date(year, month, day, hour, 0, 0, 0);
  }
}
