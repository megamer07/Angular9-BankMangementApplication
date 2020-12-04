import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    private map=new Map<string,string[]>([
        ['India',['Bangalore','Pune','Kolkata','Hyderabad']],
        ['USA',['New York','Washington DC']]

    ]);         
    identificationProofs: any=['Pan','AadharCard'];
    genders:any=['Male','Female','Others'];
    maritals:any=['Married','Single'];
    gaurdians:any=['Father','Mother'];
    accounttypes:any=['Saving','Salary'];

    name="[a-zA-z][a-zA-Z]+[a-zA-Z]$";
    contact="^[0-9_-]{10,12}";
    age:any;

    public user:User;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.user=new User();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            name: ['', [Validators.required,Validators.pattern(this.name)]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            guardianType: ['', Validators.required],
            guardianName: ['', Validators.required],
            address: ['', Validators.required],
            citizenship: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            email: ['', [Validators.required,Validators.email]],
            gender: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            contact: ['', [Validators.required,,Validators.pattern(this.contact),Validators.minLength(10),Validators.maxLength(10)]],
            dob: ['', Validators.required],
            regDate: [(new Date()).toISOString().substring(0-10), Validators.required],
            accountType: ['', Validators.required],
            branchName: ['', Validators.required],
            citizenStatus: ['', Validators.required],
            intDeposit: ['', Validators.required],
            identificationProof: ['', Validators.required],
            identificationDoc: ['', [Validators.required,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
            refAccountHolderName: ['',[Validators.required, Validators.pattern(this.name)]],
            refAccountHolderNo: ['', Validators.required],
            refAccountHolderAddress: ['', Validators.required],
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.name.setValue(x.name);
                    this.f.username.setValue(x.username);
                    this.f.address.setValue(x.address);
                    this.f.password.setValue(x.password);
                    this.f.guardianType.setValue(x.guardianType);
                    this.f.guardianName.setValue(x.guardianName);
                    this.f.state.setValue(x.state);
                    this.f.citizenship.setValue(x.citizenship);
                    this.f.country.setValue(x.country);
                    this.f.email.setValue(x.email);
                    this.f.gender.setValue(x.gender);
                    this.f.maritalStatus.setValue(x.maritalStatus);
                    this.f.contact.setValue(x.contact);
                    this.f.dob.setValue(x.dob);
                    this.f.regDate.setValue(x.regDate);
                    this.f.accountType.setValue(x.accountType);
                    this.f.branchName.setValue(x.branchName);
                    this.f.citizenStatus.setValue(x.citizenStatus);
                    this.f.intDeposit.setValue(x.intDeposit);
                    this.f.identificationProof.setValue(x.identificationProof);
                    this.f.identificationDoc.setValue(x.identificationDoc);
                    this.f.refAccountHolderName.setValue(x.refAccountHolderName);
                    this.f.refAccountHolderNo.setValue(x.refAccountHolderNo);
                    this.f.refAccountHolderAddress.setValue(x.refAccountHolderAddress);

                });
        }
    }

    get countries():string[]
    {
        return Array.from(this.map.keys());
    }
     
    get states():string[] |undefined{
        return this.map.get(this.user.country);
    }
       

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    

    CalculateCitizenStatus():void{
        if(this.user.dob){
        const bdate = new Date(this.user.dob);
        var timdeDiff =Math.abs(Date.now() - bdate.getTime());
        this.age=Math.floor((timdeDiff/(1000*3600*24))/365);
        
        if(this.age<18)
        {
            this.user.citizenStatus="Minor";
        }
        else
        if(this.age>=18 && this.age<=60)
        {
            this.user.citizenStatus="Normal";
        }
        else
        {       
            this.user.citizenStatus="Senior";
        
        }
    }

    }
    selectAccountType(e):void
    {
        
        let acctype;
        acctype=e.target.value;
        
        if(acctype==='Saving')
        {
            this.user.intDeposit=5000;
        }
        else
        if(acctype==='Salary')
        {
            this.user.intDeposit=0;
        }

    }


    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateUser() {
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}