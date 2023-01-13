import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MessageAppState } from "../state/app.state";
import { Store, select } from "@ngrx/store";
import {
  FetchMessage,
} from "../state/actions/message.action";
import { getMessages } from "../state/reducers/message.reducers";
import { Observable } from "rxjs";
import { Message } from "src/models/Message";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  list: any;
  constructor(private store: Store<MessageAppState>) { }
  displayedColumns: string[] = ['id', 'name', 'message'];
  dataSource: any;
  messageList!: Observable<Message[]>;
  loading!: Observable<Boolean>;
  error!: Observable<Error>;

  ngOnInit() {

    this.store.dispatch(FetchMessage());
    this.messageList = this.store.pipe(select(getMessages));
    console.log(this.messageList.subscribe(data => {
      this.list = data;
      this.dataSource = new MatTableDataSource(this.list)
    }));

    this.loading = this.store.select((store) => store.message.loading);
    this.dataSource = new MatTableDataSource(this.list).sort = this.sort
  }
}
