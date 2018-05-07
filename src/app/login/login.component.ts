import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ])
    });
  }

  get name(): AbstractControl { return this.loginForm.get('name'); }

  submit() {
    this.userService.exists(this.name.value).subscribe(b => {
      if (b) {
        this.userService.login(this.name.value);
        this.router.navigateByUrl('/twitter');
      } else {
        this.loginForm.controls['name'].setErrors({'doesntexist': true});
      }
    });
  }
}
