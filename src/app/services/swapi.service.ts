import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  URL_API: string = 'https://swapi.dev/api/';

  currentPlanetUrl: string = "";
  currentPersonUrl: string = "";

  constructor (private http: HttpClient) { }

  getPlanetList (pageNumber=1): Observable<object> {
    return this.http.get(this.URL_API + 'planets/?page=' + pageNumber);
  }

  getResidentsUrls (planetUrl: string) {
    return this.http.get(planetUrl);
  }

  getResident (residentUrl: string) {
    return this.http.get(residentUrl);
  }

  getCurrentPlanetUrl (): string { return this.currentPlanetUrl; }
  getCurrentPersonUrl (): string { return this.currentPersonUrl; }

  setCurrentPlanetUrl (newUrl: string) { this.currentPlanetUrl = newUrl; }
  setCurrentPersonUrl (newUrl: string) { this.currentPersonUrl = newUrl; }
}
