import { AbstractControl } from '@angular/forms';

// tslint:disable-next-line:cyclomatic-complexity
function validateChrome(arr, control) {
  const now = new Date();

  if (arr[0] < now.getFullYear()) {
    return { validDate: true };
  };

  if (arr[1] <= 0 || arr[1] > 12) {
    return { validDate: true };
  }

  if (arr[2] <= 0 || arr[2] > 31) {
    return { validDate: true };
  }
  if (Number.isNaN(Date.parse(control.value))) {
    return { validDate: true };
  }

  return null;
};

// tslint:disable-next-line:cyclomatic-complexity
function validateOther(arr, control) {
  const now = new Date();

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
};

// tslint:disable-next-line:cyclomatic-complexity
export function validateDate(control: AbstractControl) {
  if (control.value === '') {
    return null;
  }

  let arr = control.value.split('/');

  if (arr.length <= 1) {
    arr = control.value.split('-');
  }

  arr.map(value => Number(value));
  console.log(arr);

  if (arr.length === 3 && arr[0].length === 2 && arr[1].length === 2 && arr[2].length === 4) {
    return validateOther(arr, control);
  }

  if (arr.length === 3 && arr[0].length === 4 && arr[1].length === 2 && arr[2].length === 2) {
    return validateChrome(arr, control);
  }

  return { validDate: true };
}
