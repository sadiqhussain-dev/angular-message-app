import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddMessage } from '../state/actions/message.action';
import { MessageAppState } from '../state/app.state';
import { Message } from 'src/models/Message';
import * as uuid from 'uuid'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
const id = uuid.v4();
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  formGroup!: FormGroup;
  errorMessage: any;
  message: Message = new Message();
  error!: Observable<Error>;

  constructor(
    private store: Store<MessageAppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {

    this.formGroup = new FormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl('', [Validators.required]),
      message: new UntypedFormControl('', [Validators.required]),
      created_at: new UntypedFormControl('')
    })

    this.formGroup.patchValue({

      id: id,
      created_at: new Date().toLocaleDateString()
    })
  }

  onMessageFormSubmit() {

    this.store.dispatch(AddMessage({ message: this.formGroup.value }));

    if (this.formGroup.valid) {
      this.snackBar.open("Message added");
      this.dialog.closeAll();
      this.router.navigateByUrl('/')

      setTimeout(() => {
        this.snackBar.dismiss()
      }, 5000);
    }

    else {
      this.snackBar.open("Invalid form data");
      setTimeout(() => {
        this.snackBar.dismiss()
      }, 5000);
    }
  }

  get name() {
    return this.formGroup.get('name')
  }

  get messages() {
    return this.formGroup.get('message')
  }
}
