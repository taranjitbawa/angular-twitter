import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { TwitterFormComponent } from '../twitter-form/twitter-form.component';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
const routes: Routes = [
    {
      path: 'sign-up',
      component: SignUpFormComponent
    },
    {
      path: 'twitter',
      component: TwitterFormComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'logout',
      component: LogoutComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
