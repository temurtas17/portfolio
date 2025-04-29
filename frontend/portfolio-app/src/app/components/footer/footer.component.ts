import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  constructor(private analyticsService: AnalyticsService) {}
  
  /**
   * Sosyal medya bağlantı tıklamalarını izle
   */
  trackSocialClick(platform: string): void {
    this.analyticsService.logSocialClick(platform);
  }
  
  /**
   * E-posta bağlantısına tıklamayı izle
   */
  trackEmailClick(): void {
    this.analyticsService.logEvent('contact', {
      method: 'email',
      contact_type: 'footer_link'
    });
  }
}
