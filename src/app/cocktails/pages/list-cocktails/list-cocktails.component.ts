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

  constructor(private cocktailService: CocktailsService, private router: Router) {}

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
        console.log('Cocktail Details:', data);
        this.router.navigate(['/completeCocktails', cocktailId]);
      },
      (error) => {
        console.error('Error fetching cocktail details:', error);
      }
    );
  }
}
