import { MessageState } from "./reducers/message.reducers";

export interface MessageAppState {
    readonly message: MessageState;
}
