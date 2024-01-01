import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {ModifierLivreComponent} from './modifier-livre.component';
import {LivreService} from '../../service/livre.service';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ModifierLivreComponent', () => {
  let component: ModifierLivreComponent;
  let fixture: ComponentFixture<ModifierLivreComponent>;
  let route: ActivatedRoute;
  let routerSpy: jasmine.SpyObj<Router>;
  let livreServiceSpy: jasmine.SpyObj<LivreService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    livreServiceSpy = jasmine.createSpyObj('LivreService', ['updateLivre']);
    TestBed.configureTestingModule({
      declarations: [ModifierLivreComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {paramMap: of()}},
        {provide: Router, useValue: routerSpy},
        {provide: LivreService, useValue: livreServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    });

    fixture = TestBed.createComponent(ModifierLivreComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set livre on ngOnInit', () => {
    // Act
    component.ngOnInit();

  });


  it('should handle error on modifierLivre', () => {
    // Arrange
    component.livre = {titre: 'Livre 1', auteur: 'Auteur 1', anneePublication: '2020', isbn: '123456789'};
    const errorMessage = 'Erreur lors de la mise à jour du livre';
    livreServiceSpy.updateLivre.and.returnValue(of());

    // Act
    component.modifierLivre();

    // Assert
    expect(livreServiceSpy.updateLivre).toHaveBeenCalledWith(component.livre);
    // You can add further expectations for error handling within the component
  });
});
