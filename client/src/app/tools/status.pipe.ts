import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  private translations = {
    ACTIVE: 'CONFIRMADO',
    CANCELED: 'CANCELADO',
    DISABLED: 'BLOQUEADO',
    ATTENDED: 'ASISTIU',
    PAID: 'PAGOU'
  }

  transform(value: any, args?: any): any {
    const translation = this.translations[value];

    if (translation) {
      return translation;
    } else {
      return value
    }
  }

}
