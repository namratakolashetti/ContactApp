import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-contact-card",
  templateUrl: "./contact-card.component.html",
  styleUrls: ["./contact-card.component.scss"]
})
export class ContactCardComponent implements OnInit {
  @Input() contact: any = void 0;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  public defaultProfileImage: string = "../../../assets/img/avatar.png";

  constructor() {}

  ngOnInit() {
    this.contact.profileImage = this.defaultProfileImage;
  }

  delete(): void {
    this.onDelete.emit(this.contact);
  }
}
