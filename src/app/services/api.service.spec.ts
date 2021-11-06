import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let url = '<url>';
  let formData = {
    monthlyIncome: 50000,
    requestedAmount: 20000001,
    loanTerm: 36,
    childrens: 'NONE',
    cooaplicants: 'NONE'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ ApiService ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http POST method', () => {
    service.postRequest(formData).subscribe((emp)=>{
      expect(emp).toEqual(formData);
    });
     
    httpMock.expectOne(url);
    httpMock.verify();
  });

  it('should call `POST` method and return from the API', () => {
    service.postRequest(formData).subscribe((data) => {
      expect(data).toEqual(formData);
    });
    const req = httpMock.expectOne({
      method: 'POST',
      url: `${url}`
    });
    req.flush(formData);
  });
});
