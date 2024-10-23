import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'countries',
    loadComponent: () => import("@app/countries/countries.component").then(p => p.CountriesComponent)
  },
  {
    path: 'view1',
    loadComponent: () => import("@app/view1/view1.component").then(p => p.View1Component)
  },
  {
    path: 'view2',
    loadComponent: () => import("@app/view2/view2.component").then(p => p.View2Component)
  },
  {
    path: '**',
    redirectTo: "countries",
    pathMatch: "full"
  }
];
