import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithNavComponent } from './with-nav.component';

describe('WithNavComponent', () => {
  let component: WithNavComponent;
  let fixture: ComponentFixture<WithNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WithNavComponent]
    });
    fixture = TestBed.createComponent(WithNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
