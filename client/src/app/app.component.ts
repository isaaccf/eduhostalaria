import { Component } from '@angular/core';

@Component({
  selector: 'rh-root',
  template: `
    <h1>
      {{title}}
    </h1>
  `,
  styles: []
})
export class AppComponent {
  title = 'rh';
}
