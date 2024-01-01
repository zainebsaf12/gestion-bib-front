import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Livre} from "../../models/livre.model";
import {LivreService} from "../../service/livre.service";

@Component({
  selector: 'app-modifier-livre',
  templateUrl: './modifier-livre.component.html',
  styleUrls: ['./modifier-livre.component.scss']
})
export class ModifierLivreComponent implements OnInit {
  livre: Livre;

  constructor(private route: ActivatedRoute, private router: Router, private livreService: LivreService) {
    // Récupérez les données du livre depuis les paramètres de la route

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const livreParam = params.get('livre');
      if (livreParam !== null) {
        this.livre = JSON.parse(livreParam);
      } else {
        // Gérer le cas où 'livre' est null
      }
    });
  }

  modifierLivre(): void {
    if (this.livre) {
      this.livreService.updateLivre(this.livre).subscribe(
        () => {
          // La mise à jour est réussie, vous pouvez maintenant naviguer vers la page d'manage-Livre
          this.router.navigate(['/manage-Livre']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du livre :', error);
          // Gérer l'erreur selon vos besoins
        }
      );

    }
  }
}
