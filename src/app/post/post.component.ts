
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input('post') post:any;
  @Output('onDelete') onDelete = new EventEmitter();
  postData:any = {};
  user:any={};
  message:string = "";
  errmsg:any="";
 constructor(private http: HttpClient){

 }
  ngOnInit(): void {
    this.postData=this.post;
    this.user=localStorage.getItem('id');
  }
  delete(){
    this.http.post<any>("http://localhost/scribe/deletePost.php",{id:this.postData.id}).subscribe(res => {
      if(res['status']){
        this.errmsg='';
        this.message=res['message'];
        this.onDelete.emit();
      }
      else{
        this.errmsg=res['error'];
        this.message='';
      }
    },err=>{
      console.log('Error: ',err);
    });
  }
}
