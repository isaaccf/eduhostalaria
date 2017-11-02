import { AbstractControl } from '@angular/forms';

// tslint:disable-next-line:cyclomatic-complexity
export function validateTime(control: AbstractControl) {
  const arr = control.value.split(':');

  if (arr.length !== 2 || arr[0].length !== 2 || arr[1].length !== 2) {
    return { validateTime: true };
  }

  arr.map(value => Number(value));

  if (arr[0] < 0 || arr[0] > 23) {
    return { validateTime: true };
  }

  if (arr[1] < 0 || arr[1] > 59) {
    return { validateTime: true };
  }

  return null;
}
