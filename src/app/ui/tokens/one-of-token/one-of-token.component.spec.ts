import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOfTokenComponent } from './one-of-token.component';

describe('OneOfTokenComponent', () => {
  let component: OneOfTokenComponent;
  let fixture: ComponentFixture<OneOfTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneOfTokenComponent]
    });
    fixture = TestBed.createComponent(OneOfTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
