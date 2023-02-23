import { Component , Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() uid:any;
  constructor(public router:Router){
    
  }
  // if(localStorage.getItem('uid')) {
  //   this.loggedIn=true;
  // }else{
  //   this.loggedIn=false;
  // }
  ngOnInit(): void {
  
  
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
