import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlternativeButton } from './add-alternative.component';

describe('AddAlternativeComponent', () => {
  let component: AddAlternativeButton;
  let fixture: ComponentFixture<AddAlternativeButton>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlternativeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
