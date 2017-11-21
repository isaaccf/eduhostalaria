import { AbstractControl } from '@angular/forms';

// tslint:disable-next-line:cyclomatic-complexity
export function validateInteger(control: AbstractControl) {
  if (!control.value) {
    return { validateInteger: true };
  }

  const numb = Number(control.value);

  if (!Number.isInteger(numb) || numb <= 0) {
    return { validateInteger: true };
  }

  return null;
}
