import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rh-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {
  @Input() schema: IField[];
  @Input() data: any[];
  @Output() rowAction = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    // this.testData();
  }

  testData() {
    this.schema = [
      {
        label: 'Organization',
        name: 'organization',
        type: 'string'
      },
      {
        label: 'Administrator',
        name: 'administrator',
        type: 'string'
      },
      {
        label: 'Email',
        name: 'email',
        type: 'string'
      }
    ];
    this.data = [
      {
        organization: 'uno',
        administrator: 'pepe',
        email: 'a@b.c'
      },
      {
        organization: 'dos',
        administrator: 'luis',
        email: 'a@ttt.c'
      }
    ]
  }

  onRowClick(row) {
    this.rowAction.emit(row);
  }

  valueByPath(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (o) {
        if (k in o) {
          o = o[k];
        } else {
          return;
        }
      } else {
        return;
      }
    }
    return o;
  }
}

interface IField {
  label: string;
  name: string;
  type: string;
}
