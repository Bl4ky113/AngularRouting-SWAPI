import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  URL_API: string = 'https://swapi.dev/api/';

  constructor (private http: HttpClient) { }

  getPlanetList (pageNumber=1): Observable<object> {
    return this.http.get(this.URL_API + 'planets/?page=' + pageNumber);
  }
}
