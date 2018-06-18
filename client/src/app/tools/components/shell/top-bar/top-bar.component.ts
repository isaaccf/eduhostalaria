import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'app/tools/user.model';
import { environment } from 'environments/environment';

const RESIZE_WIDTH = 1280;

@Component({
  selector: 'ab-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() public user: IUser = null;
  @Input() public organization: any = null;
  @Input() public title = environment.appTitle;
  @Input() public showResponsive;

  @Output() public toggleResponsive = new EventEmitter<boolean>();

  public userInitials = '?';
  public currentState = false;

  constructor() { }

  ngOnInit() {
  }

  onShowResponsive() {
    this.currentState = true;
    this.toggleResponsive.emit(this.currentState);
  }

  onHideResponsive() {
    this.currentState = false;
    this.toggleResponsive.emit(this.currentState);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > RESIZE_WIDTH) {
      if (this.currentState) {
        this.currentState = false;
        this.toggleResponsive.emit(this.currentState);
      }
    }
  }

}
