import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementWatcherService } from './shared/services/element-watcher.serivce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementWatcher: ElementWatcherService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });

    this.elementWatcher.startWatching();
  }

  ngOnDestroy() {
    this.elementWatcher.stopWatching();
  }

  private scrollToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    setTimeout(() => {
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);
  }
}
