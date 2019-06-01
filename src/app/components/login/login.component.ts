import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BasicServiceService } from '../../services/basic-service.service';
import { LOGINDATA } from 'src/assets/constant';

export interface DialogData {
  userId: string;
}

@Component({
  selector: 'app-forget-dialog',
  templateUrl: 'forget-dialog.html',
  styleUrls: ['./login.component.css']
})
export class ForgetDialogComponent {

  send = false;

  constructor(
    public dialogRef: MatDialogRef<ForgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar) { }

  getPassword(): void {
    console.log(this.data);
    this.send = true;
    if (this.data.userId) {
      // Function calling for forget password
      this.dialogRef.close();
      this.snackBar.open(
        'Email is send to your registered email, with password.', '',
        { duration: 3000 }
      );
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
    private service: BasicServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  loginForm: FormGroup;
  submitted = false;
  userId: string;

  ngOnInit(): void {

    this.service.storage('session-get', 'token')
      ? this.router.navigate(['home'])
      : this.router.navigate(['']);

    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    let found = false;
    if (this.loginForm.invalid) { return; }

    found = this.service.login(this.loginForm.value);

    if (found) {
      this.snackBar.open('Loading ...', '', { duration: 500 });
      const token = '12312323123jk12h31kj23h1k23j12k3j12h3kj3h2k3213k12j3h1k2j3h';
      this.service.storage('session-set', 'token', token);
      this.service.changeLogged(true);
      this.router.navigate(['home']);
    } else {
      this.snackBar.open('Invalid Credential', '', { duration: 2000 });
    }

  }

  openDialog() {
    this.dialog.open(ForgetDialogComponent, {
      width: '50%',
      data: { userId: this.userId }
    });
  }

}
