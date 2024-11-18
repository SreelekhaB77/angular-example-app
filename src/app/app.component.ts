import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { translations } from '../locale/translations';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '~core/components/header/header.component';
import { FooterComponent } from '~core/components/footer/footer.component';
import { DOCUMENT } from '@angular/common';
import { filter, map } from 'rxjs';
import { HeaderService } from '~core/services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  standalone: true,
})
export class AppComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly headerService = inject(HeaderService);

  ngOnInit() {
    this.setMetaTags();
    this.subscribeRouteEvents();
  }

  focusFirstHeading(): void {
    const h1 = this.document.querySelector<HTMLHeadingElement>('h1');
    h1?.focus();
  }

  private setMetaTags() {
    this.titleService.setTitle(translations.title);
  }

  private subscribeRouteEvents() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(event => event.urlAfterRedirects),
      )
      .subscribe(url => {
        this.updateCanonicalLink(url);
      });
  }

  private updateCanonicalLink(absoluteUrl: string) {
    this.headerService.setCanonical(absoluteUrl);
  }
}
