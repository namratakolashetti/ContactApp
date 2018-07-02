//Core
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
  selector: "app-edit-contact",
  templateUrl: "./edit-contact.component.html",
  styleUrls: ["./edit-contact.component.scss"]
})
export class EditContactComponent implements OnInit, AfterViewInit, OnDestroy {
  contactForm: FormGroup;

  isLoading: boolean = false;
  contactRequest: any;
  editRequest: any;

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
    public route: ActivatedRoute,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.setupFormControls();
  }

  ngAfterViewInit() {
    this.route.params.subscribe((params: any) => {
      this.getContactDetails(params.id);
    });
  }

  private getContactDetails(id: any): void {
    let waitToast = this.toastr.infoToastr("Please wait...", null, {
      dismiss: "controlled",
      animate: "slideFromBottom"
    });
    this.contactRequest = this.contactsService.getContact(id).subscribe(
      data => {
        if (data) {
          this.contactForm.patchValue(data[0]);
        }
        waitToast.dismiss();
      },
      err => {
        waitToast.dismiss();
      }
    );
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

  private updatePlayer(payload: any) {
    this.editRequest = this.contactsService
      .updateContact(payload.id, payload)
      .subscribe(
        (data: any) => {
          this.toastr.successToastr("Contact updated successfully.", "Success");
        },
        (err: any) => {
          this.toastr.errorToastr(
            "An error occured and we unable to update this contact.",
            "Uh oh!"
          );
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  private onSave({ value, valid }: { value: any; valid: boolean }): void {
    if (valid) {
      this.updatePlayer(value);
    }
  }

  ngOnDestroy() {
    if (this.contactRequest) {
      this.contactRequest.unsubscribe();
    }
    if (this.editRequest) {
      this.editRequest.unsubscribe();
    }
  }
}
