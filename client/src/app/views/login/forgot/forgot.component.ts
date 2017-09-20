import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/views/login/login.service';
import { BusService } from 'app/tools/bus.service';
import { Level } from 'app/tools/message.model';

@Component({
  selector: 'ab-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {
  public schemas;
  private userId;

  constructor(
    private router: Router,
    private bus: BusService,
    private loginService: LoginService,
    private schema: SchemaService) { }

  ngOnInit() {
    this.schema
      .getSchema$('forgot_password')
      .subscribe(schemas => this.schemas = schemas);
  }

  onSend(email) {
    this.loginService.restorePassword(email).subscribe(() => {
      this.bus.emit({ level: Level.SUCCESS, text: 'Recibirás un correo cos pasos necesarios para activar o teu contrasinal', code: '' });
    });
    this.router.navigateByUrl('/');
  }
}
