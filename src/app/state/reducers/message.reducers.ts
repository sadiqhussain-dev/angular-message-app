import { Message } from 'src/models/Message';
import { Action } from "@ngrx/store/src/models";
import * as messageActions from '../actions/message.action';
import { createReducer, on, createSelector } from "@ngrx/store";
import { MessageAppState } from '../app.state';

export interface MessageState {
    list: Message[],
    loading: boolean,
    error: Error
}

export const initialMessageState: any = {
    list: [],
    loading: false,
    error: undefined
};

export const reducer = createReducer(
    initialMessageState,
    on(messageActions.FetchMessage, state =>
    (console.log('FetchMessage reducer called'), {
        ...state,
        loading: true,
    })),

    on(messageActions.FetchMessageSuccess, (state, { messages }) => (
        (console.log('FetchMessageSuccess reducer called'),
        {
            ...state,
            list: messages,
            loading: false
        })),
    ),

    on(messageActions.FetchMESSAGEFailure, (state, { error }) => (
        (console.log('FetchMessageFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        })),
    ),

    on(messageActions.AddMessage, state =>
    (console.log('AddMessage reducer called'), {
        ...state,
        loading: true,
    })),

    on(messageActions.AddMessageSuccess, (state, { message }) =>
    (console.log('AddMessageSuccess reducer called'), {
        ...state,
        list: [...state.list, message],
        loading: false,
    })),

    on(messageActions.AddMessageFailure, (state, { error }) => (
        (console.log('AddMessageFailure reducer called'), {
            ...state,
            error: error,
            loading: false
        }))),
);

export function messageReducer(state: MessageState | undefined, action: Action) {
    return reducer(state, action);
}

const getMessageFeatureState = (state: MessageAppState) => state.message;

export const getMessages = createSelector(
    getMessageFeatureState,
    (state: MessageState) => state.list
);

export const getMessageByID = createSelector(
    getMessageFeatureState,
    (state: MessageState) => state.list[0]
);

export { Message };