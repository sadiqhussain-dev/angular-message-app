import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Message } from "src/models/Message";

@Injectable({
  providedIn: "root",
})
export class MessageService {

  constructor(private messagesList: AngularFirestore) { }

  saveMessage(message: Message) {
    const messageData = JSON.parse(JSON.stringify(message));
    return this.messagesList.collection("messages").add(messageData);
  }

  getAllMessages(): Observable<Message[]> {

    const messages = this.messagesList
      .collection<Message>("messages", (ref) => ref.orderBy("created_at"))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((message) => ({
            id: message.payload.doc.id,
            ...message.payload.doc.data(),
          }));
        })
      );
    return messages;
  }
}
