import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private gaTrackingId = environment.gaTrackingId;
  
  constructor(private router: Router) {
    // Sayfa geçişlerini takip et
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (typeof gtag === 'function') {
        gtag('config', this.gaTrackingId, {
          'page_path': event.urlAfterRedirects
        });
        this.logPageView(event.urlAfterRedirects);
      }
    });
  }

  /**
   * Sayfa görüntüleme olayını loglar
   */
  logPageView(pagePath: string, pageTitle?: string): void {
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
        page_location: window.location.href
      });
    }
  }

  /**
   * Özel olay takibi
   */
  logEvent(eventName: string, eventParams: any = {}): void {
    if (typeof gtag === 'function') {
      gtag('event', eventName, eventParams);
    }
  }

  /**
   * Kullanıcı etkileşimi takibi
   */
  logInteraction(category: string, action: string, label?: string, value?: number): void {
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  /**
   * Proje detay sayfası görüntüleme takibi
   */
  logProjectView(projectId: string, projectTitle: string): void {
    this.logEvent('view_item', {
      items: [{
        id: projectId,
        name: projectTitle,
        category: 'Projects'
      }]
    });
  }

  /**
   * İletişim formu gönderimi takibi
   */
  logContactFormSubmission(): void {
    this.logEvent('generate_lead', {
      form_name: 'contact_form'
    });
  }

  /**
   * Dış bağlantı tıklama takibi
   */
  logExternalLinkClick(linkUrl: string, linkText: string): void {
    this.logEvent('click', {
      event_category: 'outbound',
      event_label: linkUrl,
      link_text: linkText,
      transport_type: 'beacon'
    });
  }

  /**
   * Sosyal medya profil tıklama takibi
   */
  logSocialClick(platform: string): void {
    this.logEvent('social_click', {
      social_platform: platform
    });
  }

  /**
   * Dosya indirme takibi
   */
  logDownload(fileUrl: string, fileName: string): void {
    this.logEvent('file_download', {
      file_name: fileName,
      file_url: fileUrl
    });
  }
} 