import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWidgetSchema, IKeyValue } from 'app/tools/schema.model';
import { SchemaService } from 'app/tools/components/schema.service';

@Component({
  selector: 'ab-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Input() public data: any;
  @Input() public schema: IWidgetSchema;
  @Output() send = new EventEmitter<IKeyValue>();

  constructor(private schemaService: SchemaService) { }

  ngOnInit() {
  }

  onClick(keyValue) {
    this.send.emit(keyValue);
  }

  valueByPath(target, path) {
    return this.schemaService.valueByPath(target, path);
  }

}
