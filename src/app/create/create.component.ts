import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  title:any;
  content:any;
  errmsg:any;
  message:any;
  @Output('postCreated') postCreated=new EventEmitter();
  constructor(private http: HttpClient){
    
  }
  createPost(){
    this.http.post<any>("http://localhost/scribe/createPost.php",{title:this.title,content:this.content,id:localStorage.getItem('id')}).subscribe(res => {
      if(res['status']){
        this.errmsg='';
        this.message=res['message'];
        this.title='';
        this.content='';
        this.postCreated.emit();
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
    
  }
}
