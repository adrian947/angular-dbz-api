import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable, tap } from 'rxjs';
import { Planets } from '../interfaces/planets';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://dragonball-api.com/api';

  getPlanets(): Promise<Planets> {
    const url = `${this.baseUrl}/planets`;

    return lastValueFrom( this.http.get<Planets>(url).pipe(
      tap((response: Planets) => {
        console.log('planets', response);
      })
    ));
  }
}
