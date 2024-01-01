import { Component } from '@angular/core';
import {LivreService} from "../../service/livre.service";
import {Router} from "@angular/router";
import {Livre} from "../../models/livre.model";

@Component({
  selector: 'app-ajouter-livre',
  templateUrl: './ajouter-livre.component.html',
  styleUrls: ['./ajouter-livre.component.scss']
})
export class AjouterLivreComponent {
  livre: Livre = {
    titre: '',
    auteur: '',
    anneePublication: '',
    isbn: ''
  };  constructor(private livreService: LivreService, private router: Router) {
  }
  ajouterLivre(): void {
    // Utilisez this.livre pour accéder aux données du formulaire
    this.livreService.saveLivre(this.livre).subscribe(
      (nouveauLivre: Livre) => {
        console.log('Livre ajouté avec succès :', nouveauLivre);
        // Naviguez vers /manage-Livre
        this.router.navigate(['/manage-Livre']);
      },
      (erreur) => {
        console.error('Erreur lors de l\'ajout du livre :', erreur);
        // Gérez l'erreur comme nécessaire
      }
    );
  }




}
