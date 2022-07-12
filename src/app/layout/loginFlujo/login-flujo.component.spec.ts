import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFlujoComponent } from './login-flujo.component';

describe('LoginFlujoComponent', () => {
  let component: LoginFlujoComponent;
  let fixture: ComponentFixture<LoginFlujoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFlujoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
