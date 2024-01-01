import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AccueilComponent} from './accueil.component';
import {LivreService} from '../../service/livre.service';
import {Livre} from '../../models/livre.model';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;
  let livreServiceSpy: jasmine.SpyObj<LivreService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    livreServiceSpy = jasmine.createSpyObj('LivreService', ['getLivresDispo', 'deleteLivre']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AccueilComponent],
      providers: [
        {provide: LivreService, useValue: livreServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load livres on initialization', fakeAsync(() => {
    const mockLivres: Livre[] = [
      {id: '1', titre: 'Livre 1', auteur: 'Auteur 1', anneePublication: '2020', isbn: '123456789'},
      {id: '2', titre: 'Livre 2', auteur: 'Auteur 2', anneePublication: '2021', isbn: '987654321'}
    ];

    livreServiceSpy.getLivresDispo.and.returnValue(of(mockLivres));

    component.ngOnInit();
    tick();

    expect(livreServiceSpy.getLivresDispo).toHaveBeenCalled();
    expect(component.dataSource).toEqual(mockLivres);
  }));

  it('should handle error while loading livres', fakeAsync(() => {
    livreServiceSpy.getLivresDispo.and.returnValue(throwError('Error loading livres'));

    component.ngOnInit();
    tick();

    expect(livreServiceSpy.getLivresDispo).toHaveBeenCalled();
    expect(component.dataSource).toEqual([]);
  }));

  it('should navigate to modifierLivre with correct data on editLivre', () => {
    const mockLivre: Livre = {
      id: '1',
      titre: 'Livre 1',
      auteur: 'Auteur 1',
      anneePublication: '2020',
      isbn: '123456789'
    };

    component.editLivre(mockLivre);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/manage-Livre/modifierLivre', {livre: JSON.stringify(mockLivre)}]);
  });


  it('should handle error while deleting livre', fakeAsync(() => {
    const mockLivre: Livre = {
      id: '1',
      titre: 'Livre 1',
      auteur: 'Auteur 1',
      anneePublication: '2020',
      isbn: '123456789'
    };

    livreServiceSpy.deleteLivre.and.returnValue(throwError('Error deleting livre'));

    component.deleteLivre(mockLivre);
    tick();

    expect(livreServiceSpy.deleteLivre).toHaveBeenCalled();
    expect(component.dataSource).toEqual([]);
  }));

  it('should navigate to ajouterLivre on ajouterLivre', () => {
    component.ajouterLivre();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['manage-Livre', 'ajouterLivre']);
  });
});
