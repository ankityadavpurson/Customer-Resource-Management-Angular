import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BasicService } from 'src/app/services/basic.service';
import { RestService } from 'src/app/services/rest.service';

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
    this.send = true;
    if (this.data.clientId) {
      this.service.tosterOpen('Sending mail ...');
      this.rest.post('client/forgot', { clientId: this.data.clientId },
        resp => this.service.tosterOpen(resp.message, '', 3000));
      this.dialogRef.close();
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
      password: ['', Validators.required],
      loginBtn: ['Login'],
      forgotBtn: ['Forgot Password'],
      registerBtn: ['Register']
    });

    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      shopNo: ['', Validators.required],
      address: ['', Validators.required],
      loginBtn: ['Login'],
      registerBtn: ['Register']
    });

  }

  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }

    this.loginForm.disable();
    this.service.tosterOpen('loading ...', '', 10000);
    await this.login({
      clientId: this.loginForm.value.clientId,
      password: this.loginForm.value.password
    });
  }

  private async login(client: Client) {
    try {
      const response = await this.rest.postAsync('client/login', client);
      const { data, message } = response;
      if (data) {
        this.service.storage('session-set', 'token', data.accessToken);
        this.service.storage('session-set', 'dbid', data.clientId);
        this.service.changeLogged(data);
        this.router.navigate(['home']);
        this.service.tosterDismiss();
      } else {
        this.loginForm.enable();
        this.service.tosterOpen(message, '', 2000);
      }
    } catch (error) {
      this.loginForm.enable();
      this.service.showError(error.error.message);
    }
  }

  forgotPassword() {
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

  async registerUser() {
    this.submitted = true;
    if (this.registerForm.invalid) { return; }
    this.registerForm.disable();
    this.service.tosterOpen('loading ...', '', 10000);
    const { clientId, name, mobileNo, email, password, shopNo, address } = this.registerForm.value;
    await this.registerClient({ clientId, name, mobileNo, email, password, shopNo, address });
  }

  private async registerClient(newClient: NewClient) {
    try {
      await this.rest.postAsync('client/add', newClient);
      this.openRegister();
      this.service.tosterDismiss();
    } catch (error) {
      this.registerForm.enable();
      this.service.showError(error.error.message);
    }
  }
}

interface Client {
  clientId: string;
  password: string;
}

interface NewClient {
  clientId: string;
  name: string;
  mobileNo: number;
  email: string;
  password: string;
  shopNo: string;
  address: string;
}
