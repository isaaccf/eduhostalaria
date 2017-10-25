import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';

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
    private schemaService: SchemaService
  ) { }

  ngOnInit() {
    this.schemaService.getSchema$(this.schemaName).subscribe(schema => {
      this.schema = schema;
    });
  }

  onFormSubmit(payload) {
    const filters = {};

    Object.keys(payload).forEach(key => {
      if (payload[key]) {
        filters[key] = payload[key];
      }
    });

    this.filter.emit(filters);
  }
}
