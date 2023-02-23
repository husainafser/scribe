import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path:'', redirectTo: 'home', pathMatch:'full'
},
{
  path:'home', component:HomeComponent
},
{
  path:'login', component:LoginComponent
},
{
  path:'signup', component:SignupComponent
},
{
  path:'profile/:id', component:ProfileComponent
},
{
  path:'edit-profile/:id', component:EditProfileComponent
},
{
  path:'view/:postId', component:ViewComponent
},
{
  path:'blogs', component:BlogsComponent
},
{
  path:'**', redirectTo:'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
