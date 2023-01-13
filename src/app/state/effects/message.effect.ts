import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MessageService } from "src/app/services/message.service";
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import * as MessageActions from 'src/app/state/actions/message.action';
import { of } from 'rxjs';

@Injectable()

export class MessageEffect {
    constructor(
        private actions: Actions,
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
                    map(() => MessageActions.AddMessageSuccess({ message })),
                    catchError(error => of(MessageActions.AddMessageFailure({ error })))
                ),
            )
        )
    )
}
