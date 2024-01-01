import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AjouterLivreComponent } from './ajouter-livre.component';
import { LivreService } from '../../service/livre.service';
import { of } from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AjouterLivreComponent', () => {
  let component: AjouterLivreComponent;
  let fixture: ComponentFixture<AjouterLivreComponent>;
  let livreServiceSpy: jasmine.SpyObj<LivreService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    livreServiceSpy = jasmine.createSpyObj('LivreService', ['saveLivre']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AjouterLivreComponent],
      providers: [
        { provide: LivreService, useValue: livreServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    });

    fixture = TestBed.createComponent(AjouterLivreComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveLivre and navigate to /manage-Livre on ajouterLivre', () => {
    // Arrange
    const mockLivre = { titre: 'Livre 1', auteur: 'Auteur 1', anneePublication: '2020', isbn: '123456789' };
    livreServiceSpy.saveLivre.and.returnValue(of(mockLivre));

    // Act
    component.ajouterLivre();

    // Assert
    expect(livreServiceSpy.saveLivre).toHaveBeenCalledWith(component.livre);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/manage-Livre']);
  });


});
