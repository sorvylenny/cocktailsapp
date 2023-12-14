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
  getCocktailsByGlass(Cocktail: string): Observable<Cocktails> {
    const url = `${this.baseUrl}/filter.php?c=${Cocktail}`;
    return this.http.get<Cocktails>(url);
  }
  getCocktailsByAlcoholic(Alcoholic: string): Observable<Cocktails> {
    const url = `${this.baseUrl}/filter.php?a=${Alcoholic}`;
     return this.http.get<Cocktails>(url);
  }
  getCocktailsByNotAlcoholic(Non_Alcoholic: string): Observable<Cocktails> {
    const url = `${this.baseUrl}/filter.php?a=${Non_Alcoholic}`;
     return this.http.get<Cocktails>(url);
  }

  getCocktailDetailsById(cocktailId: string): Observable<CocktailDetails> {
    const url = `${this.baseUrl}/lookup.php?i=${cocktailId}`;
    return this.http.get<CocktailDetails>(url);
  }
}
