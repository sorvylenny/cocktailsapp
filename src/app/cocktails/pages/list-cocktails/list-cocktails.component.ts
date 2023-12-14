import { Component, ElementRef, OnInit } from '@angular/core';
import { CocktailsService } from '../../Services/cocktails.service';
import { Drink } from '../../Interfaces/cocktails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cocktails',
  templateUrl: './list-cocktails.component.html',
  styleUrls: ['./list-cocktails.component.css']
})
export class ListCocktailsComponent implements OnInit {

  cocktailGlassCocktails: Drink[] = [];
  nonAlcoholicCocktails: Drink[] = [];
  alcoholicCocktails: Drink[] = [];
  dataCocktails: any[] = [];
  searchTerm: string = '';
  activeTabIndex: number=0;
  noResultsMessage: string = '';

  constructor(private cocktailService: CocktailsService,
    private router: Router,
    private elementRef: ElementRef) {}

  ngOnInit() {
    this.getCocktailsByGlass('Cocktail');
    this.getCocktailsByNotAlcoholic('Non_Alcoholic');
    this.getCocktailsByAlcoholic('Alcoholic');
  }

  getCocktailsByGlass(Cocktail: string) {
    this.cocktailService.getCocktailsByGlass(Cocktail).subscribe(
      (data) => {
        this.cocktailGlassCocktails = data.drinks;

      },
      (error) => {
        console.error('Error fetching cocktails by glass type:', error);
      }
    );
  }
  getCocktailsByAlcoholic(alcoholic: string) {
    this.cocktailService.getCocktailsByAlcoholic(alcoholic).subscribe(
      (data) => {
        this.alcoholicCocktails = data.drinks;
      },
      (error) => {
        console.error('Error fetching cocktails by NonAlcoholic:', error);
      }
    );
  }
  getCocktailsByNotAlcoholic(notAlcoholic: string) {
    this.cocktailService.getCocktailsByNotAlcoholic(notAlcoholic).subscribe(
      (data) => {
       this.nonAlcoholicCocktails = data.drinks;
      },
      (error) => {
        console.error('Error fetching cocktails by NonAlcoholic:', error);
      }
    );
  }

  viewDetails(cocktailId: string) {
    this.cocktailService.getCocktailDetailsById(cocktailId).subscribe(
      (data) => {
        this.router.navigate(['/completeCocktails', cocktailId]);
      },
      (error) => {
        console.error('Error fetching cocktail details:', error);
      }
    );
  }

  appSearchTable(inputValue: string) {
    const searchTerm = inputValue.trim().toLowerCase();
    if (!searchTerm) {
      this.showNoResultsMessage();
      this.getCocktailsByGlass('Cocktail');
      this.getCocktailsByNotAlcoholic('Non_Alcoholic');
      this.getCocktailsByAlcoholic('Alcoholic');
      return;
    }

    this.cocktailService.searchCocktailByName(searchTerm).subscribe(
      (data) => {
        if (!data || !data.drinks) {
          this.showNoResultsMessage();
          this.getCocktailsByGlass('Cocktail');
          this.getCocktailsByNotAlcoholic('Non_Alcoholic');
          this.getCocktailsByAlcoholic('Alcoholic');
          return;
        }

          const searchResults = (data.drinks || []).filter((drink: any) => {
          const drinkName = (drink.strDrink || '').trim().toLowerCase();
           return drinkName.includes(searchTerm);
        });

         switch (this.activeTabIndex) {
          case 0:
            this.cocktailGlassCocktails = searchResults;
            break;
          case 1:
            this.alcoholicCocktails = searchResults;
            break;
          case 2:
            this.nonAlcoholicCocktails = searchResults;
            break;
        }
         },
      (error) => {
        console.error('Error fetching cocktails:', error);
      }
    );
  }
  tabChanged(tabIndex: number) {
    this.activeTabIndex = tabIndex;
  }
  showNoResultsMessage() {
    this.searchTerm = 'No results found or no search term provided.';
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
