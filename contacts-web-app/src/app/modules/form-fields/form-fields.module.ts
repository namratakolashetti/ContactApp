// Core Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// UI Material Modules
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";

// Components
import { InputComponent } from "./components/input/input.component";
import { SelectComponent } from "./components/select/select.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [InputComponent, SelectComponent],
  exports: [InputComponent, SelectComponent]
})
export class FormFieldsModule {}
