import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet ,Event as RouterEvent} from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isResumePage = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      // Use a type guard to ensure the event is of type NavigationEnd
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Now safely use the urlAfterRedirects property
      this.isResumePage = event.urlAfterRedirects.includes('/resume');
    });
  }
}