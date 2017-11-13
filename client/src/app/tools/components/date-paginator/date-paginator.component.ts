import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ab-date-paginator',
  templateUrl: './date-paginator.component.html',
  styleUrls: ['./date-paginator.component.css']
})
export class DatePaginatorComponent implements OnInit {

  private now: Date;
  public startDate: Date;
  public endingDate: Date;

  @Output() dates = new EventEmitter<any>();

  constructor() {
    this.now = new Date();
  }

  ngOnInit() {
    this.startDate = new Date(Date.UTC(this.now.getFullYear(), this.now.getMonth(),
      this.getStartingDay(), 0, 0, 0, 0));
    this.endingDate = new Date(Date.UTC(this.now.getFullYear(), this.now.getMonth(),
      this.getEndingDay(), 23, 59, 59, 99));

    this.dates.emit({ startDate: this.startDate.toISOString(), endingDate: this.endingDate.toISOString() });
  }

  getStartingDay() {
    return (this.now.getDate() - this.now.getDay()) + 1;
  }

  getEndingDay() {
    return this.getStartingDay() + 6;
  }

  onNextWeek() {
    this.now.setDate(this.now.getDate() + 7);
    this.ngOnInit();
  }

  onPreviousWeek() {
    this.now.setDate(this.now.getDate() - 7);
    this.ngOnInit();
  }

}
