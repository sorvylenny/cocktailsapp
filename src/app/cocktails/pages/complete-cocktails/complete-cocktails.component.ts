import { Component } from '@angular/core';
import { CocktailsService } from '../../Services/cocktails.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-complete-cocktails',
  templateUrl: './complete-cocktails.component.html',
  styleUrls: ['./complete-cocktails.component.css']
})
export class CompleteCocktailsComponent {
  cocktailDetails: any;
  cocktailId: string | null = null;

  constructor(
    private cocktailService: CocktailsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute !== null) {
      this.cocktailId = idFromRoute;
    }

    if (this.cocktailId) {
      this.cocktailService.getCocktailDetailsById(this.cocktailId).subscribe(
        (data) => {
         this.cocktailDetails = data.drinks ? data.drinks[0] : null;
        },
        (error) => {
          console.error('Error fetching cocktail details:', error);
        }
      );
    }
  }

  hasIngredients(): boolean {
    return !!(this.cocktailDetails && (
      this.cocktailDetails.strIngredient1 ||
      this.cocktailDetails.strIngredient2 ||
      this.cocktailDetails.strIngredient3 ||
      this.cocktailDetails.strIngredient4 ||
      this.cocktailDetails.strIngredient5
    ));
  }

  hasMeasures(): boolean {
    return !!(this.cocktailDetails && (
      this.cocktailDetails.strMeasure1 ||
      this.cocktailDetails.strMeasure2 ||
      this.cocktailDetails.strMeasure3 ||
      this.cocktailDetails.strMeasure4 ||
      this.cocktailDetails.strMeasure5
    ));
  }

  hasIngredientsOrMeasures(): boolean {
    return this.hasIngredients() || this.hasMeasures();
  }

  goBack() {
    this.router.navigate(['/listCocktails']);
  }

}
