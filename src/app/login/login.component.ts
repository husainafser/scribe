import { Component } from '@angular/core';
import { FormBuilder ,FormGroup ,FormControl ,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm: FormGroup;
  message:string = "";
  errmsg:any="";
  user:any={};
  
  constructor(public fb : FormBuilder,private http: HttpClient,public router:Router){
    this.myForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }
 
  onSubmit(){


    this.http.post<any>("http://localhost/scribe/login.php",this.myForm.value).subscribe(res => {
      if(res['status']){
        this.errmsg='';
        this.message=res['message'];
        localStorage.setItem('id',res['uid']);
        this.myForm.reset();
        this.router.navigate(['/blogs']);
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
