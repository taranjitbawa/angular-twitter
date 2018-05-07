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
      color: new FormControl('FFFFFF', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  get name(): AbstractControl { return this.signUpForm.get('name'); }

  get email(): AbstractControl { return this.signUpForm.get('email'); }

  get color(): AbstractControl { return this.signUpForm.get('color'); }

  updateColor(e) {
    this.color.setValue(e.target.value);
  }

  submit() {
    this.userService.exists(this.name.value).subscribe(b => {
      if (b) {
        this.signUpForm.controls['name'].setErrors({'exists': true});
      } else {
        const user = new User(this.name.value, this.email.value, this.color.value);
        this.userService.create(user);
        this.userService.login(user.name);
        this.router.navigateByUrl('/twitter');
      }
    });
  }
}
