import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ab-text',
  templateUrl: './text.component.html',
  styles: []
})
export class TextComponent implements OnInit {

  @Input() text: any;

  constructor() { }

  ngOnInit() {
  }

}
