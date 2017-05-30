import { Component, OnInit } from '@angular/core';
import { GodDataService } from 'app/routes/god/_data/god-data.service';

@Component({
  selector: 'rh-god-home',
  templateUrl: './god-home.component.html',
  styles: []
})
export class GodHomeComponent implements OnInit {
  public organizationsCount = 0;
  constructor(private godData: GodDataService) { }

  ngOnInit() {
    this.godData
      .getOrganizationsCount()
      .subscribe(data => this.organizationsCount = data);
  }

}
