import { Component, OnInit } from '@angular/core';
import { IWidgetSchema, IAction, ILoadEmptyStateSchema, ITimelineSchema } from 'app/tools/schema.model';
import 'rxjs/add/operator/takeWhile';
import { SchemaService } from 'app/tools/components/schema.service';
import { IOrganization } from "app/tools/organization.model";
import { HomeService } from "app/views/home/home.service";

@Component({
  selector: 'ab-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  public schemas: IWidgetSchema
  public widgets: IWidgetSchema[] = [];

  constructor(
    private home: HomeService,
    private schema: SchemaService
  ) { }

  ngOnInit() {
    this.schema.getSchema$('home').subscribe(schema => {
      this.schemas = schema;
      this.home
        .getAllOrganizations()
        .subscribe(organizations => this.createWidgets(organizations));
    });
  }

  createWidgets(organizations: IOrganization[]) {
    this.widgets = [];
    organizations.forEach(organization => {
      const organizationWidget: IWidgetSchema = JSON.parse(JSON.stringify(this.schemas));
      this.pupulateWidget(organizationWidget, organization);
      this.widgets.push(organizationWidget);
    });
  }

  pupulateWidget(widget, target) {
    // To Do: autopopulate using reflection...)
    widget.header.title = this.schema.valueByPath(target, 'name');
    widget.header.subtitle = this.schema.valueByPath(target, 'slogan');
    widget.actions[0].label = `Ver oferta centro`;
    widget.actions[0].link = `/organization/${this.schema.valueByPath(target, 'slug')}`;
  }

}
