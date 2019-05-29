import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicServiceService } from '../../services/basic-service.service'; 

  export interface DialogData {
    userId: string;
  }

@Component({
    selector: 'forget-dialog',
    templateUrl: 'forget-dialog.html',
  })
export class ForgetDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ForgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  getPassword(): void {
    console.log('asdasd');
    this.dialogRef.close();
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
    public dialog: MatDialog
  ) { }
  
  loginForm: FormGroup;
  submitted = false;

  ngOnInit(): void {

    this.service.storage('session-get', 'token')
      ? this.router.navigate(['home'])
      : this.router.navigate(['']);

    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit ()  {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    const token = '12312323123jk12h31kj23h1k23j12k3j12h3kj3h2k3213k12j3h1k2j3h';
    this.service.storage('session-set', 'token', token);
    this.service.changeLogged(true);
    this.router.navigate(['home']);
  }

openDialog(): void {
  
  const dialogRef = this.dialog.open(ForgetDialogComponent, {
    width: '50%',
    data: { userId: this.userId }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
    this.userId = result;
  });
}

}
