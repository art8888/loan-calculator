import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

import { ValidationService } from '../services/validation.service';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {

  makes?: any[];
  loanForm: FormGroup;
  submited:boolean = false;
  public result: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private customValidator: ValidationService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      monthlyIncome: ['', [Validators.required, Validators.pattern(/^[.]?[0-9]+[.]?[0-9]*$/), Validators.min(500000), Validators.minLength(6)]],
      requestedAmount: ['', [Validators.required, Validators.pattern(/^[.]?[0-9]+[.]?[0-9]*$/), Validators.min(20000000), Validators.minLength(8)]],
      loanTerm: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(36), Validators.max(360)]],
      childrens: ['', [Validators.required], this.customValidator.validateSelect.bind(this.customValidator)],
      cooaplicants: ['', [Validators.required], this.customValidator.validateSelect.bind(this.customValidator)],
    });
 
  }

  

  get loanFormControl() { return this.loanForm.controls; }

  onSubmit() {
    this.submited = true;

    if (this.loanForm.invalid) //on error
      return;

    if(this.loanForm.valid) 
      this.result = this.api.postRequest(this.loanForm);
      console.log(this.result);
  }

  onReset() {
    this.submited = false;
    this.loanForm.reset();
  }

}
