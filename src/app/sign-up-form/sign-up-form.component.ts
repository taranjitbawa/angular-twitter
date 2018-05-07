import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }
  get name(): AbstractControl { return this.signUpForm.get('name'); }

  get email(): AbstractControl { return this.signUpForm.get('email'); }

  submit() {
    const user = new User(this.name.value, this.email.value);
    this.userService.create(user);
    this.userService.login(user.name);
    this.router.navigateByUrl('/twitter');
  }
}
