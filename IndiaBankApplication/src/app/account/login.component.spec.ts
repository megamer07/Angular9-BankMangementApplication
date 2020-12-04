import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import{HttpClientModule} from '@angular/common/http';
import{HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { User } from '@app/_models';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,FormsModule,RouterModule.forRoot([]),HttpClientModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=username]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    component.ngOnInit();
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let errors = {};
    let username = component.form.controls['username'];
    expect(username.valid).toBeFalsy();

    // username field is required
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  

  it('password field validity', () => {
    let errors = {};
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();

    // password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['username'].setValue("test");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();

    let user: User;
    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    component.onSubmit();

});

it('Setting enabled to false disabled the submit button', () => {
  component.enabled = false;
  fixture.detectChanges();
  expect(submitEl.nativeElement.disabled).toBeFalsy();
});

it('Setting enabled to true enables the submit button', () => {
  component.enabled = true;
  fixture.detectChanges();
  expect(submitEl.nativeElement.disabled).toBeFalsy();
});

});


