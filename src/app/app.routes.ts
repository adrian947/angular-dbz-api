import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/mainLayout/mainLayout.component';
import { HomeComponent } from '../pages/home/home.component';
import { PlanetsComponent } from '../pages/planets/planets.component';
import { CharactersComponent } from '../pages/characters/characters.component';
import { CharacterDetailsComponent } from '../pages/character-details/character-details.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'planets',
        component: PlanetsComponent,
      },
      {
        path: 'characters',
        component: CharactersComponent,
      },
      {
        path: 'characters/:id',
        component: CharacterDetailsComponent,
      },
    ],
  },
];
