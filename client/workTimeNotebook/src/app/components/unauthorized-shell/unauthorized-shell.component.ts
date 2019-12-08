import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-unauthorized-shell',
  templateUrl: './unauthorized-shell.component.html',
  styleUrls: ['./unauthorized-shell.component.css']
})
export class UnauthorizedShellComponent implements OnInit {

  place = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.setPlace(e.url);
    });

    this.setPlace(this.router.url);
  }

  setPlace(url: string) {
    if (url === '/login' ) {
      this.place = 'login';
    } else if (url === '/register' ) {
      this.place = 'register'
    }
  }

}
