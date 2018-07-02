// Core
import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";

// Services
import { ContactsService } from "../../services/contacts.service";

@Component({
  selector: "app-contact-listing",
  templateUrl: "./contact-listing.component.html",
  styleUrls: ["./contact-listing.component.scss"]
})
export class ContactListingComponent implements OnInit {
  contacts: Array<any> = [];
  isLoading: boolean = false;
  contactsRequest: any = null;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getContacts();
  }

  public getContacts(): void {
    this.isLoading = true;
    this.contactsRequest = this.contactsService.getContacts().subscribe(
      (data: any) => {
        this.contacts = data;
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        this.isLoading = false;
        this.contactsRequest = null;
      }
    );
  }

  public delete(contact: any): void {
    let c = window.confirm("Do you want to delete this contact?");
    if (c) {
      this.contactsService.deleteContact(contact.id).subscribe(
        (data: any) => {
          let index = this.contacts.findIndex(
            (x: any) => x._id === contact._id
          );
          if (index !== -1) {
            this.contacts.splice(index, 1);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.contactsRequest) {
      this.contactsRequest.unsubscribe();
    }
  }
}
