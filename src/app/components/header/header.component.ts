import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showNav$: Observable<boolean>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.showNav$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: any) => event.url.endsWith('/'))
    );
  }

  ngOnInit(): void {}
}
