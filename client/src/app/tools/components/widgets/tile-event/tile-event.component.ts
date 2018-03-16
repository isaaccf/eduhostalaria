import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ab-tile-event',
  templateUrl: './tile-event.component.html',
  styleUrls: ['./tile-event.component.css']
})
export class TileEventComponent implements OnInit {

  @Input() event: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.event.thumbnail) {
      const url = `data:${this.event.thumbnail.type};base64, ${this.event.thumbnail.content}`;

      this.event.thumbnail = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }

}
