import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MessageService } from "src/app/services/message.service";
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import * as MessageActions from 'src/app/state/actions/message.action';
import { of } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Injectable()

export class MessageEffect {
    constructor(
        private router: Router,
        private actions: Actions,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private messageService: MessageService
    ) { }

    loadMessage = createEffect(() =>
        this.actions.pipe(
            ofType(MessageActions.FetchMessage),
            switchMap(() =>
                this.messageService.getAllMessages().pipe(
                    map((messages) => MessageActions.FetchMessageSuccess({ messages })),
                    catchError(error => of(MessageActions.FetchMESSAGEFailure({ error })))
                )
            )
        ),
    )

    addMessage = createEffect(() =>
        this.actions.pipe(
            ofType(MessageActions.AddMessage),
            mergeMap(({ message }) =>
                of(this.messageService.saveMessage(message)).pipe(
                    map(() => MessageActions.AddMessageSuccess({ message }), this.displaySnakeBarMessage("Message saved", true)),
                    catchError(error => of(MessageActions.AddMessageFailure({ error })))
                ),
            )
        )
    )

    displaySnakeBarMessage(message: string, success: boolean): void
    {
        this.snackBar.open(message);
        this.dialog.closeAll();
        
        if(success)
            this.router.navigateByUrl('/')
  
        setTimeout(() => {
          this.snackBar.dismiss()
        }, 5000);
    }
}
