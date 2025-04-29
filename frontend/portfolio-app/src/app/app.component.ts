import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService } from './services/seo.service';
import { AnalyticsService } from './services/analytics.service';
import { filter } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private seoService: SeoService,
    private title: Title,
    private meta: Meta,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    // Her rota değişiminde meta etiketlerini güncelle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Varsayılan SEO etiketlerini ayarla
      this.updateDefaultMetaTags();
      
      // Rota bazlı SEO ayarları
      const route = this.router.url;
      
      if (route === '/') {
        this.seoService.updateTags({
          title: 'Ana Sayfa',
          description: 'Mustafa Temurtaş, Angular ve Node.js konusunda uzmanlaşmış Full Stack Geliştirici. Projelerimi ve yeteneklerimi keşfedin.'
        });
      } else if (route.includes('/about')) {
        this.seoService.updateTags({
          title: 'Hakkımda',
          description: 'Ben Mustafa Temurtaş, tutkulu bir Full Stack Geliştirici. Yeteneklerim, deneyimlerim ve yazılım geliştirme yaklaşımım hakkında bilgi edinin.'
        });
      } else if (route.includes('/projects')) {
        this.seoService.updateTags({
          title: 'Projelerim',
          description: 'Mustafa Temurtaş tarafından geliştirilen en son projeler. Web uygulamaları, API entegrasyonları ve diğer yazılım geliştirme çalışmalarını inceleyin.'
        });
      } else if (route.includes('/contact')) {
        this.seoService.updateTags({
          title: 'İletişim',
          description: 'Mustafa Temurtaş ile iletişime geçin. Bir proje önerisi, iş birliği veya herhangi bir soru için benimle iletişime geçebilirsiniz.'
        });
      }
    });
  }

  private updateDefaultMetaTags(): void {
    // Site genelinde ortak meta etiketleri
    this.meta.addTags([
      { name: 'keywords', content: 'Mustafa, Temurtaş, Full Stack, Geliştirici, Developer, Angular, Node.js, Web, Yazılım, Portfolyo, Portfolio, Ankara' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Mustafa Temurtaş' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Mustafa Temurtaş' },
    ]);
  }
}
