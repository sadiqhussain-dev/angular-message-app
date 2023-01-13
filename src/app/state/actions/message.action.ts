import { createAction, props } from '@ngrx/store';
import { Message } from 'src/models/Message'

export enum MessageActionTypes {

    FETCH_MESSAGE = "[MESSAGE] Fetch MESSAGE",
    FETCH_MESSAGE_SUCCESS = "[MESSAGE] Fetch MESSAGE Success",
    FETCH_MESSAGE_FAILURE = "[MESSAGE] Fetch MESSAGE Failed",
    ADD_MESSAGE = '[MESSAGE] Add',
    ADD_MESSAGE_SUCCESS = "[MESSAGE] Add MESSAGE Success",
    ADD_MESSAGE_FAILURE = "[MESSAGE] Add MESSAGE Failed"
}

export const FetchMessage = createAction(

    MessageActionTypes.FETCH_MESSAGE
)

export const FetchMessageSuccess = createAction(

    MessageActionTypes
        .FETCH_MESSAGE_SUCCESS,
    props<{ messages: Message[] | any }>()
)

export const FetchMESSAGEFailure = createAction(

    MessageActionTypes
        .FETCH_MESSAGE_FAILURE,
    props<{ error: any }>()
)

export const AddMessage = createAction(

    MessageActionTypes
        .ADD_MESSAGE,
    props<{ message: Message }>()
)

export const AddMessageSuccess = createAction(

    MessageActionTypes
        .ADD_MESSAGE_SUCCESS,
    props<{ message: Message | any }>()
)

export const AddMessageFailure = createAction(

    MessageActionTypes
        .ADD_MESSAGE_FAILURE,
    props<{ error: any }>()
)