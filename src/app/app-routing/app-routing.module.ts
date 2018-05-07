import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { TwitterFormComponent } from '../twitter-form/twitter-form.component';
const routes: Routes = [
    {
      path: 'sign-up',
      component: SignUpFormComponent
    },
    {
      path: 'twitter',
      component: TwitterFormComponent
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
