import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit{
  posts:any[]=[];
  user:any={};
  constructor(private http: HttpClient){
    this.getPosts();
    
    }


  getPosts(){
    this.http.post<any>("http://localhost/scribe/fetchPosts.php",{uid:0}).subscribe(res => {
      if(res['status']){
        this.posts=res['posts'];
        console.log(res['posts']);
      }
    },err=>{
      console.log('Error: ',err);
    });
  }

  ngOnInit(): void {
    this.user=localStorage.getItem('id');
  }
  onPostCreated(){
   this.posts=[];
    this.getPosts();
  }
  onDelete(){
    this.posts=[];
     this.getPosts();
   }
}
