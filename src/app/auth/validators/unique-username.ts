import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

// Enable class to use the DI system
@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  // Bind the context of the validate function to the instance of the class
  // with the arrow function, otherwise it's undefined
  validate = (control: FormControl) => {
    const { value } = control;

    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        if (value.available) {
          return null;
        }
      }),
      catchError((err) => {
        if (err.error.username) {
          // of operator is a shortcut for creating a new observable
          // it will just emit the value
          return of({
            nonUniqueUsername: true,
          });
        } else {
          return of({
            noConnection: true,
          });
        }
      })
    );
  };
}
