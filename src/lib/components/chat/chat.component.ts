import { Component, Input, OnDestroy, OnInit, inject, ViewChild } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { message } from 'src/lib/structures/profile';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  offcanvas !: NgbActiveOffcanvas;
  private firestore!: FirestoreService;

  @Input() username: string = "";
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport


  // { username: "renn", sms: "wassup", time: new Date() },
  // { username: "dane", sms: "hola", time: new Date() },
  // { username: "luka", sms: "wassup here", time: new Date() }

  $messages !: Subscription
  messageQuery: message[] = [];


  constructor() {
    this.offcanvas = inject(NgbActiveOffcanvas);
    this.firestore = inject(FirestoreService);
  }

  scroll(): void {
    this.viewport.scrollToIndex(this.messageQuery.length);
  }

  ngOnInit(): void {
    this.$messages = this.firestore.messageTracer().subscribe({
      next: (messages) => {
        this.messageQuery = messages.sort((left: any, right: any) => left.time - right.time);
        setTimeout(() => {
          this.scroll()
        }, 100);
      },
      error: (error) => {
        console.log("ERROR", error)
      }
    });
  }

  ngOnDestroy(): void {
    this.$messages.unsubscribe();
  }

  sendMessage(sms: string, inputElem: any): void {
    let message: message = {
      username: this.username,
      sms: sms,
      time: new Date().getTime()
    }
    this.firestore.addData$("Messages", message)
    inputElem.value = "";
  }
}
