import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoanFormComponent } from './loan-form.component';

describe('LoanFormComponent', () => {
  let component: LoanFormComponent;
  let fixture: ComponentFixture<LoanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ LoanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoanFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form using formbuilder', () => {
    expect(component.loanForm instanceof FormGroup).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LoanFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Loan Form Calculator');
  });

  it('should have 3 input fields', () => {
    const compiled = fixture.debugElement.nativeElement;
    const inputelements = compiled.querySelectorAll('input');
    expect(inputelements.length).toEqual(3);
  });

  it('should have empty initial values', () => {
    const loanFormGroup = component.loanForm;
    const loanFormValues = {
      monthlyIncome: '',
      requestedAmount: '',
      loanTerm: '',
      childrens: '',
      cooaplicants: '',
    }
    expect(loanFormGroup.value).toEqual(loanFormValues);
  });

  it('should validate `monthlyIncome` input field', () => {
    const loanFormMonthlyIncome: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('input')[0];
    
    loanFormMonthlyIncome.value = '1000';
    loanFormMonthlyIncome.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const monthlyIncomeFormGroup = component.loanForm.get('monthlyIncome');
      expect(Number(loanFormMonthlyIncome.value)).toEqual(monthlyIncomeFormGroup.value);
      expect(monthlyIncomeFormGroup.errors).not.toBeNull();
    });
  });

  it('should validate `requestedAmount` input field', () => {
    const loanFormRequestedAmount: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('input')[1];
    
    loanFormRequestedAmount.value = '1000';
    loanFormRequestedAmount.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const requestedAmountformGroup = component.loanForm.get('requestedAmount');
      expect(Number(loanFormRequestedAmount.value)).toEqual(requestedAmountformGroup.value);
      expect(requestedAmountformGroup.errors).not.toBeNull();
    });
  });

  it('should validate `loanTerm` input field', () => {
    const loanFromLoanTerm: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('input')[2];

    loanFromLoanTerm.value = '30';
    loanFromLoanTerm.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const loanTermFormGroup = component.loanForm.get('loanTerm');
      expect(Number(loanFromLoanTerm.value)).toEqual(loanTermFormGroup.value);
      expect(loanTermFormGroup.errors).not.toBeNull();
    });
  });

  it('should validate `childrens` dropdown field', () => {
    const loanFormChildrens: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('select')[0];
    
    loanFormChildrens.value = '';
    loanFormChildrens.dispatchEvent(new Event('select'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const childrensFormGroup = component.loanForm.get('childrens');
      expect(childrensFormGroup.value).toEqual(childrensFormGroup.value);
      expect(childrensFormGroup.errors).not.toBeNull();
    });
  });

  it('should validate `cooaplicants` dropdown field', () => {
    const loanFormCooaplicants: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('select')[1];
    
    loanFormCooaplicants.value = '';
    loanFormCooaplicants.dispatchEvent(new Event('select'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cooaplicantsFormGroup = component.loanForm.get('childrens');
      expect(cooaplicantsFormGroup.value).toEqual(cooaplicantsFormGroup.value);
      expect(cooaplicantsFormGroup.errors).not.toBeNull();
    });
  });

  it('should be `loanForm` valid on correct data', () => {
    const loanFormMonthlyIncome   = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('input')[0];
    const loanFormRequestedAmount = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('input')[1];
    const loanFromLoanTerm        = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('input')[2];
    const loanFormChildrens: HTMLSelectElement      = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('select')[0];
    const loanFormCooaplicants: HTMLSelectElement   = fixture.debugElement.nativeElement.querySelector('#loanForm').querySelectorAll('select')[1];

    loanFormMonthlyIncome.value   = 50000;
    loanFormRequestedAmount.value = 20000001;
    loanFromLoanTerm.value        = 36;
    loanFormChildrens.value       = 'NONE';
    loanFormCooaplicants.value    = 'NONE';

    loanFormMonthlyIncome.dispatchEvent(new Event('input'));
    loanFormRequestedAmount.dispatchEvent(new Event('input'));
    loanFromLoanTerm.dispatchEvent(new Event('input'));
    loanFormChildrens.dispatchEvent(new Event('select'));
    loanFormCooaplicants.dispatchEvent(new Event('select'));

    const isLoanFormValid = component.loanForm.valid;

    fixture.whenStable().then(() => {
      console.log(isLoanFormValid);
      expect(isLoanFormValid).toBeFalsy();
    });
  });

  
});

