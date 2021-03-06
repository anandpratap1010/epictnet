import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { DialogflowService } from 'src/app/services/dialogflow.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Input('message')
  private message : Message;
  @Input('messages')
  private messages : Message[];

  constructor(private dialogFlowService: DialogflowService) { }

  ngOnInit() {
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
      this.messages.push(
        new Message(res.result.fulfillment.speech, 'Bot', res.timestamp)
      );
    });
    this.message = new Message('', 'User');
  }

}
