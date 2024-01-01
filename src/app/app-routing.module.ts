import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullComponent} from './layouts/full/full.component';
import {AccueilComponent} from "./pages/livre/manage-Livre/accueil.component";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/manage-Livre',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AccueilComponent,
        pathMatch: 'full',
      },
      {
        path: 'manage-Livre',
        loadChildren: () =>
          import('./pages/accueil.module').then((m) => m.AccueilModule),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
