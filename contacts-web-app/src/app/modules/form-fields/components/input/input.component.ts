// Core
import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator
} from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() mode: string = "input" // input | datepicker | textarea
  @Input() type: string = "text";
  @Input() appearance: string = "outline"; // standard | outline | fill
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() icon: string = "";
  @Input() control: FormControl = new FormControl();
  @Input() requiredErrMessage: string = "Required Field.";
  @Input() emailErrMessage: string = "Please enter valid an email id.";
  @Input() minLengthErrMessage: string = "";
  @Input() maxLengthErrMessage: string = "";
  @Input() patternErrMessage: string = "";


  public value: string = "";
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

  public onChange(event) {
    let _value = event.target.value;
    this.value = _value;
    this.propagateChange(this.value);
  }

  public validate(c: FormControl): any {
    return this.validateFn(c);
  }

  public getErrorMessages(): string {
    let error = "";
    if (this.control.hasError('required')) {
      error = this.requiredErrMessage;
    }
    if (this.control.hasError('email')) {
      error = this.emailErrMessage;
    }
    if (this.control.hasError('pattern')) {
      error = this.patternErrMessage;
    }
    if (this.control.hasError('minlength')) {
      error = this.minLengthErrMessage;
    }
    if (this.control.hasError('maxlength')) {
      error = this.maxLengthErrMessage;
    }
    return error;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
