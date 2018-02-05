import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { IWidgetSchema, IKeyValue, IReportSchema, IFormSchema, IHeader, IAction } from 'app/tools/schema.model';

@Component({
  selector: 'ab-editor',
  templateUrl: './editor.component.html',
  styles: []
})
export class EditorComponent implements OnInit {
  @Input() public actionSchema: IWidgetSchema;
  @Input() public reportSchema: IReportSchema;
  @Input() public tableData: IWidgetSchema;
  @Input() public createFormSchema?: IFormSchema;
  @Input() public cardSchema: IWidgetSchema;
  @Input() public filterSchema;

  @Output() public create = new EventEmitter<IKeyValue>();
  @Output() public delete = new EventEmitter<IKeyValue>();
  @Output() public rowAction = new EventEmitter<IKeyValue>();
  @Output() public filter = new EventEmitter<any>();

  public createModalActive = false;
  public deleteModalActive = false;
  public selectedItem: any;

  constructor() { }

  ngOnInit() {
  }

  onAction(data: IKeyValue) {
    if (data.key === 'create_new') {
      this.createModalActive = true;
    } else {
      this.rowAction.emit(data);
    }
  }

  onRowAction(data: IKeyValue) {

    if (data.key === 'delete') {
      this.deleteModalActive = true;
      this.selectedItem = data.value;
    } else {
      this.rowAction.emit(data);
    }
  }

  onCreate(data) {
    this.createModalActive = false;
    this.create.emit(data);
  }

  onDelete(data) {
    this.deleteModalActive = false;
    this.delete.emit(data);
  }

  onCancelCreate() {
    this.createModalActive = false;
  }

  onCancelDelete() {
    this.deleteModalActive = false;
  }

  onFilter(data) {
    this.filter.emit(data);
  }
}
