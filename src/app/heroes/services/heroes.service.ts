import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes():Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string):Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined))
      );
  }

  getSuggestions(term: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${term}&_limit=6`);
  }

}
