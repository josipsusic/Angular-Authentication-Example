import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Alternatively use signedin$: BehaviorSubject with
  // async pipe in the template
  signedin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.signedin$.subscribe((signedin) => {
      this.signedin = signedin;
    });

    this.authService.checkAuth().subscribe(() => {});
  }
}
