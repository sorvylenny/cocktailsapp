import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCocktailsComponent } from './complete-cocktails.component';

describe('CompleteCocktailsComponent', () => {
  let component: CompleteCocktailsComponent;
  let fixture: ComponentFixture<CompleteCocktailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteCocktailsComponent]
    });
    fixture = TestBed.createComponent(CompleteCocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
