import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup ,FormControl ,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  myForm: FormGroup;
  message:string = "";
  errmsg:any="";
  user:any={};
  constructor(public fb : FormBuilder,private http: HttpClient,public router:Router){
    this.myForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]]
    })
  }
 
  onSubmit(){


    this.http.post<any>("http://localhost/scribe/sign.php",this.myForm.value).subscribe(res => {
      if(res['status']){
        this.errmsg='';
        this.message=res['message'];
        this.myForm.reset();
        this.router.navigate(['/login']);
      }
      else{
        this.errmsg=res['error'];
        this.message='';
        
      }
    },err=>{
      console.log('Error: ',err);
    });
  }
  ngOnInit(): void {
    this.user=localStorage.getItem('id');
  }
}
