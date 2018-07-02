// Core
import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator
} from "@angular/forms";

// Material Select
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() appearance: string = "outline"; // standard | outline | fill
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() key: string = "id";
  @Input() text: string = "text";
  @Input() options: Array<any> = [];
  @Input() multiple: boolean = false;
  @Input() control: FormControl = new FormControl();
  @Input() requiredErrMessage: string = "Required Field.";

  public value: any;
  public disabled: boolean;
  private propagateChange: Function;
  private onTouched: Function;
  private validateFn: Function;

  constructor() {
    this.propagateChange = (_: any) => {};
    this.onTouched = () => {};
    this.validateFn = () => {};
    this.disabled = false;
  }

  ngOnInit() {}

  public writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange(event: MatSelectChange) {
    let _value = event.value;
    this.value = _value;
    this.propagateChange(this.value);
  }

  public validate(c: FormControl): any {
    return this.validateFn(c);
  }

  public getErrorMessages(): string {
    let error = "";
    if (this.control.hasError("required")) {
      error = this.requiredErrMessage;
    }
    return error;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
