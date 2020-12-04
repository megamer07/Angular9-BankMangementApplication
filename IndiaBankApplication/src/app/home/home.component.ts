import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { AccountService, AlertService } from '@app/_services';

import { User } from '../_models/user';

@Component({
  selector: 'app-loan',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  alert:boolean=false;
  form: FormGroup;
  loading = false;
  submitted = false;
  optionValue;
  user:User;

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    //    private accountService: AccountService,
      //  private alertService: AlertService,  
  ) {

    this.user=new User();
   }

  ngOnInit() {
    this.form=this.formBuilder.group({
      loanType:['',Validators.required],
      loanAmount:['',Validators.required],
      loanApplyDate:['',Validators.required],
      loanIssueDate:['',Validators.required],
      roi:['',Validators.required],
      loanDuration:['',Validators.required],
      courseFee:['',Validators.required],
      course:['',Validators.required],
      fatherName:['',Validators.required],
      fatherOccupation:['',Validators.required],
      fatherTotalExperience:['',Validators.required],
      fatherCurrentExperience:['',Validators.required],
      rationCard:['',Validators.required],
      annualIncome:['',Validators.required],
      companyName:['',Validators.required],
      designation:['',Validators.required],
      totalExperience:['',Validators.required],
      currentExperience:['',Validators.required]



    });
  }
  get f() { return this.form.controls; }

  selectroi(e):void
  { 
    let ltype;
    ltype=e.target.value;
    if(ltype=='eduloan')
    {
      this.user.roi=5;
    }
    else
    
      if(ltype=='perloan')
      {
        this.user.roi=10;
      }
    
  }

  onSubmit(){
    this.submitted=true;
    this.alert=true;
    if(this.form.invalid)
    {
      return;
    }
    this.loading=true;
  }

  clearForm(form: FormGroup) {
    this.alert=false;
    console.log(this.alert);
    form.reset();
    }
    

}
