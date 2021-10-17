import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,  throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl: string = 'https://homework.fdp.workers.dev/';
  httpOptions = {
    headers: new HttpHeaders({
      'X-API-KEY': '<key>>'
    })
  };

  constructor( private http: HttpClient, ) { }

  postRequest(formData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: (HttpErrorResponse | any)) {
    if(error.error instanceof ErrorEvent) {
      return error.error.message;
    } else {
      return error.status;
    }
    return throwError('Something has wrong; Api is not working!');
  }
}
