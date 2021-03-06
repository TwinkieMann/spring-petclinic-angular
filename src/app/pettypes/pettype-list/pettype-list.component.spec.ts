import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PettypeListComponent } from './pettype-list.component';
import {Specialty} from "../../specialties/specialty";
import Spy = jasmine.Spy;
import {PetTypeService} from "../pettype.service";
import {PetType} from "../pettype";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivatedRouteStub, RouterStub} from "../../testing/router-stubs";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Rx";
import {of} from "rxjs/index";

class PetTypeServiceStub {
  deletePetType(type_id: string): Observable<number> {
    return of();
  }
  getPetTypes(): Observable<PetType[]> {
    return of();
  }
}


describe('PettypeListComponent', () => {
  let component: PettypeListComponent;
  let fixture: ComponentFixture<PettypeListComponent>;
  let pettypeService: PetTypeService;
  let spy: Spy;
  let testPettypes: PetType[];
  let response_status: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PettypeListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {provide: PetTypeService, useClass: PetTypeServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PettypeListComponent);
    component = fixture.componentInstance;

    testPettypes = [{
      id: 1,
      name: 'test'
    }];

    pettypeService = fixture.debugElement.injector.get(PetTypeService);
    response_status = 204; // success delete return NO_CONTENT
    component.pettypes = testPettypes;

    spy = spyOn(pettypeService, 'deletePetType')
      .and.returnValue(Observable.of(response_status));

    fixture.detectChanges();
  });

  it('should create PettypeListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deletePetType() method', () => {
    fixture.detectChanges();
    component.deletePettype(component.pettypes[0]);
    expect(spy.calls.any()).toBe(true, 'deletePetType called');
  });
});
