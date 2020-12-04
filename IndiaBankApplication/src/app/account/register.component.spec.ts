import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import{HttpClientModule} from '@angular/common/http';
import{HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { User } from '@app/_models';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,FormsModule,RouterModule.forRoot([]),HttpClientModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let errors = {};
    let name = component.form.controls['name'];
    expect(name.valid).toBeFalsy();

    // Email field is required
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set name to something
    name.setValue("test789");
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set name to something correct
    name.setValue("armanchand");
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
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

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue("12345");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set email to something correct
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
});

  it('email field validity', () => {
        let errors = {};
        let email = component.form.controls['email'];
        expect(email.valid).toBeFalsy();

        // Email field is required
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set email to something
        email.setValue("test");
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeTruthy();

        // Set email to something correct
        email.setValue("test@example.com");
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeFalsy();
    });

    it('contact field validity', () => {
      let errors = {};
      let contact = component.form.controls['contact'];
      expect(contact.valid).toBeFalsy();
  
      // contact field is required
      errors = contact.errors || {};
      expect(errors['required']).toBeTruthy();
  
  
      // Set contact to something correct
      contact.setValue("9760856511");
      errors = contact.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();

      // Set contact to something correct
      contact.setValue("1234567898");
      errors = contact.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();

    // Set contact to something correct
      contact.setValue("1234567898");
      errors = contact.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['maxlength']).toBeFalsy();
  });

  it('identificationDoc field validity', () => {
    let errors = {};
    let identificationDoc = component.form.controls['identificationDoc'];
    expect(identificationDoc.valid).toBeFalsy();

    // Email field is required
    errors = identificationDoc.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set name to something
    identificationDoc.setValue("test789");
    errors = identificationDoc.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set name to something correct
    identificationDoc.setValue("BFWPC7113O");
    errors = identificationDoc.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});

it('refAccountHolderName field validity', () => {
  let errors = {};
  let refAccountHolderName = component.form.controls['refAccountHolderName'];
  expect(refAccountHolderName.valid).toBeFalsy();

  // Email field is required
  errors = refAccountHolderName.errors || {};
  expect(errors['required']).toBeTruthy();

  // Set name to something
  refAccountHolderName.setValue("test789");
  errors = refAccountHolderName.errors || {};
  expect(errors['required']).toBeFalsy();
  expect(errors['pattern']).toBeTruthy();

  // Set name to something correct
  refAccountHolderName.setValue("armanchand");
  errors = refAccountHolderName.errors || {};
  expect(errors['required']).toBeFalsy();
  expect(errors['pattern']).toBeFalsy();
});

it('guardianType field validity', () => {
  let errors = {};
  let guardianType = component.form.controls['guardianType'];
  expect(guardianType.valid).toBeFalsy();

  // Email field is required
  errors = guardianType.errors || {};
  expect(errors['required']).toBeTruthy();
});
it('guardianName field validity', () => {
  let errors = {};
  let guardianName = component.form.controls['guardianName'];
  expect(guardianName.valid).toBeFalsy();

  // Email field is required
  errors = guardianName.errors || {};
  expect(errors['required']).toBeTruthy();
});
it('address field validity', () => {
  let errors = {};
  let address = component.form.controls['address'];
  expect(address.valid).toBeFalsy();

  // Email field is required
  errors = address.errors || {};
  expect(errors['required']).toBeTruthy();
});
it('state field validity', () => {
  let errors = {};
  let state = component.form.controls['state'];
  expect(state.valid).toBeFalsy();

  // Email field is required
  errors = state.errors || {};
  expect(errors['required']).toBeTruthy();
});

it('submitting a form emits a user', () => {
  expect(component.form.valid).toBeFalsy();
  component.form.controls['username'].setValue("test");
  component.form.controls['password'].setValue("123456789");
  expect(component.form.valid).toBeFalsy();

  let user: User;
  // Subscribe to the Observable and store the user in a local variable.
  component.loggedIn.subscribe((value) => user = value);

  // Trigger the login function
  component.onSubmit();


});

});

