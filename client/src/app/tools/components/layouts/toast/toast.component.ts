import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Level } from 'app/tools/message.model';
import { MessagesService } from 'app/tools/messages.service';

const TIMEOUT = 3000;
const TIMEOUT_ERR = 6000;

@Component({
  selector: 'ab-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnChanges {

  @Input() show: boolean;
  @Input() closeButton?: boolean;
  @Input() level: Level;
  @Input() text: string;

  @Output() close = new EventEmitter<boolean>();

  constructor(
    private messagesService: MessagesService
  ) { }

  ngOnInit() { }

  ngOnChanges(change: SimpleChanges) {
    if (this.changedToShow(change)) {
      this.autoCloseIfNoButton();
    }
  }

  changedToShow(change) {
    return change.show && change.show.currentValue === true
  }

  autoCloseIfNoButton() {
    if (!this.closeButton) {
      const timeout = this.level === Level.ERROR ? TIMEOUT_ERR : TIMEOUT;
      setTimeout(() => {
        this.show = false;
        this.close.emit(false);
      }, timeout);
    }
  }

  onCloseClick() {
    this.show = false;
    this.close.emit(false);
  }

  getLevelClass(): string {
    const levelClass = 'toast-' +
      this.messagesService
        .getClassByLevel(this.level);
    return levelClass;
  }

}
