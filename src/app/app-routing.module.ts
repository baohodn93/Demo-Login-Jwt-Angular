import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './form-login/register/register.component';
import { FontSizeComponent } from './shared/font-size/font-size.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  // {path:'', component: HomeComponent},
  // {path:'font-size', component: FontSizeComponent},
  // {path: 'register', component: RegisterComponent, data: { title: 'Register'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
