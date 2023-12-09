import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cocktails/login/login.component';
import { ListCocktailsComponent } from './cocktails/pages/list-cocktails/list-cocktails.component';
import { CompleteCocktailsComponent } from './cocktails/pages/complete-cocktails/complete-cocktails.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'listCocktails', component: ListCocktailsComponent },
  { path: 'completeCocktails/:id', component: CompleteCocktailsComponent},
  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
