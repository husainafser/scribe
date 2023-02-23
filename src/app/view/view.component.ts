import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  post:any={};
  postId: any="";
  user:any={};
  constructor(public activateRoute:ActivatedRoute,private http: HttpClient, public Ngzone:NgZone){
    let postId = this.activateRoute.snapshot.paramMap.get("postId");
    console.log(postId);
    this.postId=postId;
    this.http.post<any>("http://localhost/scribe/fetchPost.php",{id:postId}).subscribe(res => {
      if(res['status']){
        console.log(res);
        this.Ngzone.run(()=>{
          this.post=res;
        })
      }
    },err=>{
      console.log('Error: ',err);
    });
  }

  ngOnInit(): void {
    this.user=localStorage.getItem('id');
  }

}
