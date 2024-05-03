import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet, Event as RouterEvent, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isResumePage = false;
  isDarkThemeActive = false;


  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      // Use a type guard to ensure the event is of type NavigationEnd
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isResumePage = event.urlAfterRedirects.includes('/resume');
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkUrl();
    });
    this.route.fragment.pipe(
      map(fragment => {
        return fragment === 'experience' || fragment === 'contact';
      })
    ).subscribe(isDark => {
      this.isDarkThemeActive = isDark;
    });
  }

  private checkUrl() {
    const url = this.router.url;
    this.isDarkThemeActive = url.includes('experience') || url.includes('contact');
  }



  @HostListener('window:scroll', [])
  onWindowScroll() {
    const experienceElement = document.getElementById('experience');
    const contactElement = document.getElementById('contact');
    const projectsElement = document.getElementById('projects');
    const aboutElement = document.getElementById('about');
    const scrollTop = window.scrollY;

    const experienceTop = experienceElement ? experienceElement.offsetTop : 0;
    const contactTop = contactElement ? contactElement.offsetTop : 0;
    const projectsTop = projectsElement ? projectsElement.offsetTop : 0;
    const aboutTop = aboutElement ? aboutElement.offsetTop : 0;
  
      if (scrollTop >= aboutTop && scrollTop < experienceTop) {
        this.router.navigate([], { fragment: 'about', replaceUrl: true });
        this.isDarkThemeActive = false;
    } else if (scrollTop >= experienceTop && scrollTop < projectsTop) {
        this.router.navigate([], { fragment: 'experience', replaceUrl: true });
        this.isDarkThemeActive = true;
    } else if (scrollTop >= projectsTop && scrollTop < contactTop) {
        this.router.navigate([], { fragment: 'projects', replaceUrl: true });
        this.isDarkThemeActive = false;
    } else if (scrollTop >= contactTop) {
        this.router.navigate([], { fragment: 'contact', replaceUrl: true });
        this.isDarkThemeActive = true;
    }
  }
  
  
}