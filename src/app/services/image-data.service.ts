import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { appProperties } from 'src/properties'
// import 'rxjs/add/operator/catch'
@Injectable({
  providedIn: 'root',
})
export class ImageDataService {
  constructor(private http: HttpClient) {}
  //Geting data from the API
  getData(): Observable<any> {
    const url = appProperties.url;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  //Error Handling
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
