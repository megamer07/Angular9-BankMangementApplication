import { Component, OnInit ,EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';

@Component({ selector: 'app-item-output',templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    @Output() loggedIn = new EventEmitter<User>();
    @Output() account = new EventEmitter<User["accountNo"]>();
    form: FormGroup;
    loading = false;
    submitted = false;
    validamt =false;
    acctype:string;
    accountno:any;
    
    private map=new Map<string,string[]>([
        ['India',['Bangalore','Pune','Kolkata','Hyderabad']],
        ['USA',['New York','Washington DC']]

    ]);         
    identificationProofs: any=['Pan','AadharCard'];
    genders:any=['Male','Female','Others'];
    maritals:any=['Married','Single'];
    gaurdians:any=['Father','Mother'];
    accounttypes:any=['Saving','Salary'];

    name="^[a-zA-Z]+(\s[a-zA-Z]+)?$";
    contact="^[0-9_-]{10,12}";
    age:any;
    
   
    
    public user:User;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,   
         ) {
        this.user=new User();
     }

    ngOnInit() {
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
            contact: ['', [Validators.required,,Validators.pattern(this.contact),
            Validators.minLength(10),Validators.maxLength(10)]],
            dob: ['', Validators.required],
            regDate: [(new Date()).toISOString().substring(0,10), Validators.required],
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

    generate(n) {
        var add = 1, max = 17- add;   

        if ( n > max ) {
                return this.generate(max) + this.generate(n - max);
        }

        max        = Math.pow(10, n+add);
        var min    = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;

        this.accountno=("" + number).substring(add);
        console.log("In generate function"); 
        console.log(this.accountno);
        return this.accountno;
        
}

    onSubmit() {
        this.submitted = true;
        this.user.accountNo = this.generate(16);
        console.log(this.user.accountNo);
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}