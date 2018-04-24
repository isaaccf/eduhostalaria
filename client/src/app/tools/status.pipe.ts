import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  // tslint:disable-next-line:cyclomatic-complexity
  transform(value: any, args?: any): any {
    switch (value) {
      case 'ACTIVE':
        return 'CONFIRMADO';
      case 'CANCELED':
        return 'CANCELADO';
      case 'DISABLED':
        return 'BLOQUEADO';
      case 'ATTENDED':
        return 'ASISTIU';
      case 'PAID':
        return 'PAGOU';
      default:
        return value;
    }
  }

}
