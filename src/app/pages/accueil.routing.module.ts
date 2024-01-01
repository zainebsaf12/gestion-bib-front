import {Routes} from '@angular/router';
import {AccueilComponent} from "./livre/manage-Livre/accueil.component";
import {AjouterLivreComponent} from "./livre/ajouter-livre/ajouter-livre.component";
import {ModifierLivreComponent} from "./livre/modifier-livre/modifier-livre.component";

export const AccueilRoutes: Routes = [
  {
    path: '',
    component: AccueilComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'ajouterLivre',
    component: AjouterLivreComponent,
  },
  {
    path: 'modifierLivre',
    component: ModifierLivreComponent,
  },
];
