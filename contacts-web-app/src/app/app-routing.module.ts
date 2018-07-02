// Core
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { ContactListingComponent } from "./components/contact-listing/contact-listing.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { EditContactComponent } from "./components/edit-contact/edit-contact.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/contacts",
    pathMatch: "full"
  },
  {
    path: "contacts",
    component: ContactListingComponent,
  },
  {
      path: "contacts/add",
      component: AddContactComponent
    },
    {
      path: "contacts/edit/:id",
      component: EditContactComponent,
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
