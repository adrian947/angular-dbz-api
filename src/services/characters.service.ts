import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CharacterDetail, Characters } from '../interfaces/characters';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://dragonball-api.com/api';

  getCharacters(page: number = 1): Promise<Characters> {
    const url = `${this.baseUrl}/characters?page=${page}&limit=8`;
    return lastValueFrom(this.http.get<Characters>(url));
  }

  getCharacter(id: number): Promise<CharacterDetail> {
    const url = `${this.baseUrl}/characters/${id}`;
    return lastValueFrom(this.http.get<CharacterDetail>(url));
  }
}
