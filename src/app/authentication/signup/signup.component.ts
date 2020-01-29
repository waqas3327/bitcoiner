import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../sdk/users.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  loading = false;
  public clicked = false;
  SignupData: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private uuserService: UsersService) {  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(){
    this.formInitializer();
  }
  formInitializer() {
    this.SignupData = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.matchOtherValidator('password')
        ]
      ]
    });
  }
  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }
SaveToDB() {
    this.clicked = true;
    this.loading = true;
    this.uuserService.userRegister(this.SignupData.value).subscribe(
      data => {
        console.log('got response from server', data);
        alert('Registeration Successfull!');
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      error => {
        this.clicked = false;
        this.loading = false;
        console.log('error', error);
        alert('Registeration Failed!User Already Exists');
      }
    );
  }
}