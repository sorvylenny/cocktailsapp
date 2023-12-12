import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Cocktails } from '../Interfaces/cocktails';
import { Observable } from 'rxjs';
import { CocktailDetails } from '../Interfaces/cockatailsDetails';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

private baseUrl: string= environment.baseUrl;

  constructor( private http: HttpClient) { }

  searchCocktailByName(name: string): Observable<any> {
    const url = `${this.baseUrl}/search.php?s=${name}`;
    return this.http.get(url);
  }
  getCocktailsByGlass(glassType: string): Observable<Cocktails> {
    const url = `${this.baseUrl}/filter.php?g=${glassType}`;
    return this.http.get<Cocktails>(url);
  }

  getCocktailsByCategory(Ordinary_Drink: string): Observable<Cocktails> {
    const url = `${this.baseUrl}/filter.php?c=${Ordinary_Drink}`;
    return this.http.get<Cocktails>(url);
  }

  getCocktailsByAlcoholic(Alcoholic: string): Observable<Cocktails> {
    const url = `${this.baseUrl}/filter.php?c=${Alcoholic}`;
    return this.http.get<Cocktails>(url);
  }
  getCocktailDetailsById(cocktailId: string): Observable<CocktailDetails> {
    const url = `${this.baseUrl}/lookup.php?i=${cocktailId}`;
    return this.http.get<CocktailDetails>(url);
  }
}
