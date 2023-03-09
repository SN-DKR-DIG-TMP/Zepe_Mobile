import { Directive } from '@angular/core';
import {CustomvalidationService} from "../services/customValidation/custom-validation.service";
import {AbstractControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: '[appPasswordPattern]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordPatternDirective, multi: true }]

})
export class PasswordPatternDirective {

  constructor(private customValidator: CustomvalidationService) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.patternValidator()(control);
  }
}
