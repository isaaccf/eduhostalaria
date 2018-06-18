// tslint:disable:cyclomatic-complexity
import { AbstractControl } from '@angular/forms';

const YEAR_POSITION = 0;
const MONTH_POSITION = 1;
const DAY_POSITION = 2;
const MIN_VALUE = 0;
const MAX_MONTHS = 12;
const MAX_DAYS = 31;
const MAX_DAYS_MONTH_LENGTH = 2;
const MAX_YEAR_LENGTH = 4;
const MAX_ARR_LENGTH = 3;

function validateChrome(arr, control) {
  if (arr[MONTH_POSITION] <= MIN_VALUE || arr[MONTH_POSITION] > MAX_MONTHS) {
    return { validDate: true };
  }

  if (arr[DAY_POSITION] <= MIN_VALUE || arr[DAY_POSITION] > MAX_DAYS) {
    return { validDate: true };
  }

  if (arr[YEAR_POSITION].length !== MAX_YEAR_LENGTH) {
    return { validDate: true };
  };

  if (Number.isNaN(Date.parse(`${arr[YEAR_POSITION]}-${arr[MONTH_POSITION]}-${arr[DAY_POSITION]}`))) {
    return { validDate: true };
  }

  return null;
};

function validateOther(arr, control) {
  if (arr[YEAR_POSITION] <= MIN_VALUE || arr[DAY_POSITION] > MAX_DAYS) {
    return { validDate: true };
  }

  if (arr[MONTH_POSITION] <= MIN_VALUE || arr[MONTH_POSITION] > MAX_MONTHS) {
    return { validDate: true };
  }

  if (arr[DAY_POSITION].length !== MAX_YEAR_LENGTH) {
    return { validDate: true };
  };

  if (Number.isNaN(Date.parse(`${arr[DAY_POSITION]}-${arr[MONTH_POSITION]}-${arr[YEAR_POSITION]}`))) {
    return { validDate: true };
  }

  return null;
};

export function validateOptionalDate(control: AbstractControl) {
  if (!control.value || control.value === '' || control.value === 'dd/mm/aaaa') {
    return null;
  }

  let arr = control.value.split('/');

  if (arr.length <= 1) {
    arr = control.value.split('-');
  }

  arr.map(value => Number(value));

  if (arr.length === MAX_ARR_LENGTH
    && arr[YEAR_POSITION].length === MAX_DAYS_MONTH_LENGTH
    && arr[MONTH_POSITION].length === MAX_DAYS_MONTH_LENGTH
    && arr[DAY_POSITION].length === MAX_YEAR_LENGTH) {
    return validateOther(arr, control);
  }

  if (arr.length === MAX_ARR_LENGTH
    && arr[YEAR_POSITION].length === MAX_YEAR_LENGTH
    && arr[MONTH_POSITION].length === MAX_DAYS_MONTH_LENGTH
    && arr[DAY_POSITION].length === MAX_DAYS_MONTH_LENGTH) {
    return validateChrome(arr, control);
  }

  return { validDate: true };
}
