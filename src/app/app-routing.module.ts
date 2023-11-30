import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RoutinesComponent } from './routines/routines.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'routines', component: RoutinesComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
