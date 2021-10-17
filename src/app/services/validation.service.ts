import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  constructor() { }

  validateSelect(userControl: AbstractControl) {
    const valArr = ["NONE", "SINGLE", "MULTIPLE", "SINGLE_BORROWER", "MULTIPLE_BORROWERS"];

    return new Promise(resolve => {
      setTimeout(() => {
        if (valArr.indexOf(userControl.value) > -1) {
         return resolve({ incorrectSelection: true });
        } else {
         return resolve(null);
        }
      }, 1000);
    });
  }
}
