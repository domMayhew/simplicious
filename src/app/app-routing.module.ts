import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RoutinesComponent } from './routines/routines.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'routines', component: RoutinesComponent },
  { path: 'lists', component: ListsComponent },
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
