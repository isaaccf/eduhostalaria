import { AbstractControl } from '@angular/forms';

// tslint:disable-next-line:cyclomatic-complexity
export function validateDate(control: AbstractControl) {
  const arr = control.value.split('/');
  const now = new Date();

  if (arr.length !== 3 || arr[0].length !== 2 || arr[1].length !== 2 || arr[2].length !== 4) {
    return { validDate: true };
  }

  arr.map(value => Number(value));

  if (arr[0] <= 0 || arr[0] > 31) {
    return { validDate: true };
  }

  if (arr[1] <= 0 || arr[1] > 12) {
    return { validDate: true };
  }

  if (arr[2] < now.getFullYear()) {
    return { validDate: true };
  };

  if (Number.isNaN(Date.parse(control.value))) {
    return { validDate: true };
  }

  return null;
}
