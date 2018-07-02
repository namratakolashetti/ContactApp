//Core module
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ng6-toastr-notifications";

//Routing Module
import { AppRoutingModule } from "./app-routing.module";

//Material Modules
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule
} from "@angular/material";

//Custom Modules
import { FormFieldsModule } from "./modules/form-fields/form-fields.module";

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { ContactListingComponent } from "./components/contact-listing/contact-listing.component";
import { ContactCardComponent } from "./components/contact-card/contact-card.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { EditContactComponent } from "./components/edit-contact/edit-contact.component";

//Services
import { ContactsService } from "./services/contacts.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ContactListingComponent,
    AddContactComponent,
    EditContactComponent,
    ContactCardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormFieldsModule,
    ToastrModule.forRoot()
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
