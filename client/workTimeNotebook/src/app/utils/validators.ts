import { AbstractControl } from '@angular/forms';
import { RegisterBackendService } from '../modules/backend/services/register/register-backend.service';
import { map } from 'rxjs/operators';


export function validateEmailNotTaken(registerBackendService: RegisterBackendService) {
    return (control: AbstractControl) => {
        return registerBackendService.checkEmailNotTaken(control.value).pipe(
            map(res => {
                return res ? null : { emailTaken: true };
            })
        );
    };
}

export function validatePassword(control: AbstractControl) {
    const password = control.get('password');
    const passwordSecond = control.get('passwordSecond');

    return password.value === passwordSecond.value ? null : { passwordEquality: true };
}
