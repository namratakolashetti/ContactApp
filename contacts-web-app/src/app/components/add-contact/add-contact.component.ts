// Core
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

// Toastr
import { ToastrManager } from "ng6-toastr-notifications";

// Services
import { ContactsService } from "../../services/contacts.service";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"]
})
export class AddContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;

  isLoading: boolean = false;
  addRequest: any;

  statusOptions: Array<any> = [
    {
      id: "Active",
      text: "Active"
    },
    {
      id: "InActive",
      text: "InActive"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    public router: Router,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.setupFormControls();
  }

  public setupFormControls(): void {
    this.contactForm = this.fb.group({
      id: "",
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: "",
      status: ""
    });
  }

  public addPlayer(payload: any): void {
    this.isLoading = true;
    this.addRequest = this.contactsService.addContact(payload).subscribe(
      (data: any) => {
        this.router.navigate(["/contacts"]);
        this.toastr.successToastr(
          "New contact created successfully.",
          "Success"
        );
      },
      (err: any) => {
        this.toastr.errorToastr(
          "An error occured and we unable to add new contact.",
          "Uh oh!"
        );
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  public onSave({ value, valid }: { value: any; valid: boolean }): void {
    if (valid) {
      this.addPlayer(value);
    }
  }

  ngOnDestroy() {
    if (this.addRequest) {
      this.addRequest.unsubscribe();
    }
  }
}
