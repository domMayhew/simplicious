import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrTokenComponent } from './or-token.component';

describe('OrComponent', () => {
  let component: OrTokenComponent;
  let fixture: ComponentFixture<OrTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrTokenComponent]
    });
    fixture = TestBed.createComponent(OrTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
