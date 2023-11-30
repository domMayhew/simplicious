import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullGridWidthComponent } from './full-grid-width.component';

describe('FullGridWidthComponent', () => {
  let component: FullGridWidthComponent;
  let fixture: ComponentFixture<FullGridWidthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FullGridWidthComponent]
    });
    fixture = TestBed.createComponent(FullGridWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
