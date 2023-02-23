import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user:any={};
  details:any={};
  message:any;
  constructor(private http: HttpClient){
   this.getProfile();
  }
  ngOnInit(): void {
    this.user=localStorage.getItem('id');
  }

  getProfile(){
    this.http.post<any>("http://localhost/scribe/fetchDetails.php",{id:localStorage.getItem('id')}).subscribe(res => {
      if(res['status']){
          this.details=res;
          console.log(this.details);
      }
    },err=>{
      console.log('Error: ',err);
    });
  }
  updateDetails(){
    this.http.post<any>("http://localhost/scribe/updateDetails.php",{id:this.details['id'],firstname:this.details['firstname'],lastname:this.details['lastname'],email:this.details['email'],bio:this.details['bio'],interest:this.details['interest'],hobbies:this.details['hobbies']}).subscribe(res => {
      if(res['status']){
        this.message="Updated Successfully."
      }
    },err=>{
      console.log('Error: ',err);
    });
  }
}
