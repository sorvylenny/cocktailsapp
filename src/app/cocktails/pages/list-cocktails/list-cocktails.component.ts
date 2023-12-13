import { Component, OnInit } from '@angular/core';
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
  ordinaryDrinkCocktails: Drink[] = [];
  dataCocktails: any[] = [];
  searchTerm: string = '';
  activeTabIndex: number=0;
  noResultsMessage: string = '';

  constructor(private cocktailService: CocktailsService,
    private router: Router) {}

  ngOnInit() {
    this.getCocktailsByGlass('Cocktail_glass');
    this.getCocktailsByCategory('Ordinary_Drink');
  }

  getCocktailsByGlass(glassType: string) {
    this.cocktailService.getCocktailsByGlass(glassType).subscribe(
      (data) => {
        this.cocktailGlassCocktails = data.drinks;

      },
      (error) => {
        console.error('Error fetching cocktails by glass type:', error);
      }
    );
  }

  getCocktailsByCategory(category: string) {
    this.cocktailService.getCocktailsByCategory(category).subscribe(
      (data) => {
        this.ordinaryDrinkCocktails = data.drinks;
      },
      (error) => {
        console.error('Error fetching cocktails by category:', error);
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
    console.log('Término de búsqueda:', searchTerm);

    if (!searchTerm) {
      this.showNoResultsMessage();
      this.getCocktailsByCategory('Ordinary_Drinks');
      this.getCocktailsByGlass('Cocktail_glass');
      return;
    }

    this.cocktailService.searchCocktailByName(searchTerm).subscribe(
      (data) => {
        console.log('Datos de la API:', data);

        if (!data || !data.drinks) {
          this.showNoResultsMessage();
          this.getCocktailsByCategory('Ordinary_Drinks');
          this.getCocktailsByGlass('Cocktail_glass');
          return;
        }

          const searchResults = (data.drinks || []).filter((drink: any) => {
          const drinkName = (drink.strDrink || '').trim().toLowerCase();
          console.log('Drink Name:', drinkName);
          return drinkName.includes(searchTerm);
        });

         switch (this.activeTabIndex) {
          case 0:
            this.cocktailGlassCocktails = searchResults;
            break;
          case 1:
            this.ordinaryDrinkCocktails = searchResults;
            break;
        }
        console.log('Resultados:', searchResults);
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

}
