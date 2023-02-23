import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user:any={};
  posts:any[]=[];
  postId='0';
constructor(public activateRoute:ActivatedRoute,private http: HttpClient){
  this.postId = this.activateRoute.snapshot.paramMap.get("id")!;
  this.getProfile();
  this.getPosts();
}
getProfile(){
  this.http.post<any>("http://localhost/scribe/fetchDetails.php",{id:this.postId}).subscribe(res => {
    if(res['status']){
        this.user=res;
    }
  },err=>{
    console.log('Error: ',err);
  });
}

getPosts(){
  this.http.post<any>("http://localhost/scribe/fetchPosts.php",{uid:this.postId}).subscribe(res => {
    if(res['status']){
      this.posts=res['posts'];
      console.log(res['posts']);
    }
  },err=>{
    console.log('Error: ',err);
  });
}
  ngOnInit(): void {
   
  }
}
