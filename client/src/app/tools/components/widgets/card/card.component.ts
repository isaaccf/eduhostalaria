import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWidgetSchema, IKeyValue } from 'app/tools/schema.model';
import { SchemaService } from 'app/tools/components/schema.service';

@Component({
  selector: 'ab-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public data: any;
  @Input() public schema: IWidgetSchema;

  @Output() send = new EventEmitter<IKeyValue>();

  constructor(private schemaService: SchemaService) { }

  ngOnInit() { }

  onClick(keyValue) {
    this.send.emit(keyValue);
  }

  valueByPath(target, path) {
    return this.schemaService.valueByPath(target, path);
  }

}
