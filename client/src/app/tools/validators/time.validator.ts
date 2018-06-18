// tslint:disable:cyclomatic-complexity
import { AbstractControl } from '@angular/forms';

const HOURS_POSITION = 0;
const MINUTES_POSITION = 1;
const MIN_VALUE = 0;
const MAX_LENGTH = 2;
const MAX_HOURS = 23;
const MAX_MINUTES = 59;

export function validateTime(control: AbstractControl) {
  if (!control.value || control.value === '' || control.value === 'hh:mm') {
    return { validateTime: true };
  }

  const arr = control.value.split(':');

  if (arr.length !== MAX_LENGTH || arr[0].length !== MAX_LENGTH || arr[1].length !== MAX_LENGTH) {
    return { validateTime: true };
  }

  arr.map(value => Number(value));

  if (arr[HOURS_POSITION] < MIN_VALUE || arr[HOURS_POSITION] > MAX_HOURS) {
    return { validateTime: true };
  }

  if (arr[MINUTES_POSITION] < MIN_VALUE || arr[MINUTES_POSITION] > MAX_MINUTES) {
    return { validateTime: true };
  }

  return null;
}
