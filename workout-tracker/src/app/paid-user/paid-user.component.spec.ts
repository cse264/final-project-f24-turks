import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidUserComponent } from './paid-user.component';

describe('PaidUserComponent', () => {
  let component: PaidUserComponent;
  let fixture: ComponentFixture<PaidUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
