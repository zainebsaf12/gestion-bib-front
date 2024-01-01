import {NgModule} from "@angular/core";
import {AccueilComponent} from "./livre/manage-Livre/accueil.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material.module";
import {FormsModule} from "@angular/forms";
import {NgApexchartsModule} from "ng-apexcharts";
import {RouterModule} from "@angular/router";
import {TablerIconsModule} from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";
import {AccueilRoutes} from "./accueil.routing.module";
import {AjouterLivreComponent} from "./livre/ajouter-livre/ajouter-livre.component";
import {ModifierLivreComponent} from "./livre/modifier-livre/modifier-livre.component";

@NgModule({
  declarations: [AccueilComponent,AjouterLivreComponent,ModifierLivreComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(AccueilRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class AccueilModule {
}
