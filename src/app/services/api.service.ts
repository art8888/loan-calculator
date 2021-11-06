import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,  throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl: string = '<url>';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-API-KEY': '<XXX-XXXXXX>'
    })
  };

  constructor( private http: HttpClient, ) { }

  postRequest(formData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log('Error: ',errorMessage);
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${JSON.stringify(error.error)}`;
      console.log('err',errorMessage);
    }
    return throwError(errorMessage);
  }

}
