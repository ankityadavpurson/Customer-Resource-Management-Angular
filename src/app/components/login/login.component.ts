import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BasicService } from 'src/app/services/basic.service';
import { RestService } from 'src/app/services/rest.service';
import { LOGINDATA } from 'src/app/models/schema';

export interface DialogData {
  clientId: string;
}

@Component({
  selector: 'app-forgot-dialog',
  templateUrl: 'forgot-dialog.html',
  styleUrls: ['./login.component.css']
})
export class ForgotDialogComponent {

  send = false;

  constructor(
    public dialogRef: MatDialogRef<ForgotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: BasicService,
    private rest: RestService
  ) { }

  getPassword(): void {
    console.log(this.data);
    this.send = true;
    if (this.data.clientId) {
      this.rest.post('client/forgot', { clientId: this.data.clientId },
        resp => this.service.tosterOpen(resp.message, '', 3000));
      this.dialogRef.close();
      // this.dialogRef.close();
      // this.service.tosterOpen('Email is send to your registered email, with password.', '', 3000);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: BasicService,
    public dialog: MatDialog,
    private rest: RestService
  ) { }

  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  submitted = false;
  clientId: string;
  register = false;

  ngOnInit(): void {

    this.service.storage('session-get', 'token')
      ? this.router.navigate(['home'])
      : this.router.navigate(['']);

    this.loginForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      shopNo: ['', Validators.required],
      address: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }

    this.service.tosterOpen('lodding ...', '', 10000);

    // let found = false;
    // const resp = {
    //   data: {
    //     accessToken: 'this is test token'
    //   },
    //   message: 'Invlid credential.'
    // };

    // LOGINDATA.forEach(user => {
    //   const { clientId, password } = this.loginForm.value;
    //   if (user.clientId === clientId && user.password === password) {
    //     found = true;
    //     return;
    //   }
    // });

    this.rest.post('login', this.loginForm.value,
      resp => {
        const found = resp.data !== 0 ? true : false;
        if (found) {
          const token = resp.data.accessToken;
          this.service.storage('session-set', 'token', token);
          this.service.changeLogged(found);
          this.router.navigate(['home']);
          this.service.tosterDismiss();
        } else {
          this.service.tosterDismiss();
          this.service.tosterOpen(resp.message, '', 2000);
        }
      });
  }

  openDialog() {
    this.dialog.open(ForgotDialogComponent, {
      width: '50%',
      data: { clientId: this.clientId }
    });
  }

  openRegister() {
    this.register = !this.register;
    this.hide = true;
    this.submitted = false;
  }

  registerUser() {
    this.submitted = true;
    if (this.registerForm.invalid) { return; }

    this.service.tosterOpen('lodding ...', '', 10000);

    this.rest.post('client/add', this.registerForm.value,
      resp => {
        this.openRegister();
        this.service.tosterDismiss();
      });

  }

}
