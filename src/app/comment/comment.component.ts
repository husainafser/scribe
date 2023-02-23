import { Component,OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  
  comment:string="";
  comments=[
  {
    date:null,comment:null,uid:null
  }
  ];
  loggedIn:Boolean =false;
  
  @Input("postId") postId!: string;

  constructor(private http: HttpClient){
    if(localStorage.getItem('id')) {
      this.loggedIn=true;
    }
    else{
      this.loggedIn=false;
    }
    // window.onbeforeunload = function() {
    //   localStorage.removeItem('id');
    //   return '';
    // };
  }
  
  ngOnInit(): void {
    this.getComments();
  }
   
  postComment(){
    if (this.comment.length < 5) {
      this.comment="";
      return;
    }
    this.http.post<any>("http://localhost/scribe/createComment.php",{comment:this.comment,uid:localStorage.getItem('id'),post:this.postId}).subscribe(res => {
      if(res['status']){
       console.log(res['message']) ;
       this.getComments();
      }
      else{
        console.log(res['error']) ;
      }
    },err=>{
      console.log('Error: ',err);
    });
  }
  getComments(){
    this.http.post<any>("http://localhost/scribe/fetchComments.php",{id:this.postId}).subscribe(res => {
      if(res['status']){
        this.comments=res['comments'];
        console.log(this.comments);
      }
    },err=>{
      console.log('Error: ',err);
    });
  }
}
