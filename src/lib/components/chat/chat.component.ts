import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { message } from 'src/lib/structures/profile';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  offcanvas !: NgbActiveOffcanvas;
  private firestore!: FirestoreService;

  @Input() username: string = "";

  $messages !: Subscription
  messageQuery: DocumentData[] = [];

  constructor() {
    this.offcanvas = inject(NgbActiveOffcanvas);
    this.firestore = inject(FirestoreService);
  }

  ngOnInit(): void {
    console.log("OPENED CHAT")
    this.$messages = this.firestore.messageTracer().subscribe({
      next: (messages) => {
        this.messageQuery = messages.sort((left: any, right: any) => left.time.seconds - right.time.seconds)
      },
      error: (error) => {
        console.log("ERROR", error)
      }
    });
  }

  ngOnDestroy(): void {
    this.$messages.unsubscribe();
  }

  sendMessage(sms: string, obj: any): void {
    let message: message = {
      username: this.username,
      sms: sms,
      time: new Date()
    }
    this.firestore.addData$("Messages", message)
    obj.value = "";
  }
}
