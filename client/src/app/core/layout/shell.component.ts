import { Component, OnInit } from '@angular/core';
import { BusService } from 'app/core/shared/bus.service';
import { IMessage } from 'app/core/shared/toast/toast.component';

@Component({
  selector: 'rh-shell',
  template: `
    <rh-top-bar></rh-top-bar>
    <rh-main-content></rh-main-content>
    <rh-toast [show]="show" closeButton="true" [text]="text" [level]="level" ></rh-toast>
  `,
  styles: []
})
export class ShellComponent implements OnInit {
  public show: boolean;
  public text = '';
  public level = '';
  constructor(private bus: BusService) { }

  ngOnInit() {
    this.bus
      .getMessage$()
      .subscribe((message: IMessage) => {
        console.log(JSON.stringify(message));
        this.text = message.text;
        this.level = message.level;
        this.show = true;
      });
  }

}
