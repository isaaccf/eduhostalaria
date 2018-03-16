import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { OrganizationService } from 'app/views/organization/organization.service';
import { SecurityService } from 'app/tools/security.service';

@Component({
  selector: 'ab-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() schemaName;

  @Output() filter = new EventEmitter<any>();

  public schema;

  constructor(
    private schemaService: SchemaService,
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    this.schemaService.getSchema$(this.schemaName).subscribe(schema => {
      this.schema = schema;
    });
  }

  onFormSubmit(payload) {
    const filters = {};

    if (payload.startDate === 'dd/mm/aaaa') {
      delete payload.startDate;
    }

    if (payload.endingDate === 'dd/mm/aaaa') {
      delete payload.endingDate;
    }

    const organization = this.securityService.getLocalOrganization();
    if (organization) {
      payload.organizationId = organization._id;
    }

    Object.keys(payload).forEach(key => {
      if (payload[key]) {
        filters[key] = payload[key];
      }
    });

    this.filter.emit(filters);
  }
}
