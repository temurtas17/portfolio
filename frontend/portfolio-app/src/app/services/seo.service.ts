import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  /**
   * Sets page title and description
   * @param title Page title
   * @param description Page description
   */
  updateTitle(title: string): void {
    this.title.setTitle(title ? `${title} | Mustafa Temurtaş` : 'Mustafa Temurtaş | Full Stack Geliştirici | Angular & Node.js');
  }

  updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  /**
   * Update canonical URL
   */
  updateCanonicalUrl(url?: string): void {
    const canURL = url || this.getCanonicalUrl();
    const link = document.querySelector('link[rel="canonical"]');
    link?.setAttribute('href', canURL);
  }

  /**
   * Get canonical URL
   */
  getCanonicalUrl(): string {
    return 'https://www.temurtas.net' + this.router.url;
  }

  /**
   * Update all meta tags
   * @param config Configuration for SEO
   */
  updateTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }): void {
    if (config.title) {
      this.updateTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: `${config.title} | Mustafa Temurtaş` });
    }

    if (config.description) {
      this.updateDescription(config.description);
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }

    this.updateCanonicalUrl(config.url);

    // Update common tags
    this.meta.updateTag({ property: 'og:url', content: this.getCanonicalUrl() });
    this.meta.updateTag({ name: 'author', content: 'Mustafa Temurtaş' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
  
  /**
   * SEO optimizasyon raporu oluşturur
   */
  generateSeoReport(): SeoReport {
    const metaTags = document.querySelectorAll('meta');
    const report: SeoReport = {
      title: this.title.getTitle(),
      description: this.getMetaContent('description'),
      keywords: this.getMetaContent('keywords'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
      ogTags: {
        title: this.getMetaContent('og:title', 'property'),
        description: this.getMetaContent('og:description', 'property'),
        url: this.getMetaContent('og:url', 'property'),
        image: this.getMetaContent('og:image', 'property'),
        type: this.getMetaContent('og:type', 'property')
      },
      structuredData: this.getStructuredData(),
      issues: []
    };
    
    // SEO sorunlarını kontrol et
    this.checkSeoIssues(report);
    
    return report;
  }
  
  /**
   * Meta etiketinin içeriğini alır
   */
  private getMetaContent(name: string, attributeName: string = 'name'): string {
    const meta = document.querySelector(`meta[${attributeName}="${name}"]`);
    return meta?.getAttribute('content') || '';
  }
  
  /**
   * Yapılandırılmış verileri alır
   */
  private getStructuredData(): string[] {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const data: string[] = [];
    
    scripts.forEach(script => {
      data.push(script.textContent || '');
    });
    
    return data;
  }
  
  /**
   * SEO sorunlarını kontrol eder
   */
  private checkSeoIssues(report: SeoReport): void {
    // Title kontrolü
    if (!report.title || report.title.length < 10) {
      report.issues.push({
        type: 'error',
        message: 'Sayfa başlığı çok kısa veya mevcut değil.'
      });
    } else if (report.title.length > 70) {
      report.issues.push({
        type: 'warning',
        message: 'Sayfa başlığı çok uzun (70 karakterden fazla).'
      });
    }
    
    // Description kontrolü
    if (!report.description) {
      report.issues.push({
        type: 'error',
        message: 'Meta açıklaması mevcut değil.'
      });
    } else if (report.description.length < 50) {
      report.issues.push({
        type: 'warning',
        message: 'Meta açıklaması çok kısa (50 karakterden az).'
      });
    } else if (report.description.length > 160) {
      report.issues.push({
        type: 'warning',
        message: 'Meta açıklaması çok uzun (160 karakterden fazla).'
      });
    }
    
    // Canonical URL kontrolü
    if (!report.canonical) {
      report.issues.push({
        type: 'warning',
        message: 'Canonical URL mevcut değil.'
      });
    }
    
    // Open Graph tag kontrolü
    if (!report.ogTags.title || !report.ogTags.description || !report.ogTags.image) {
      report.issues.push({
        type: 'warning',
        message: 'Eksik Open Graph etiketleri.'
      });
    }
    
    // Structured data kontrolü
    if (report.structuredData.length === 0) {
      report.issues.push({
        type: 'warning',
        message: 'Yapılandırılmış veri (JSON-LD) mevcut değil.'
      });
    }
  }
}

/**
 * SEO raporu arayüzü
 */
export interface SeoReport {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTags: {
    title: string;
    description: string;
    url: string;
    image: string;
    type: string;
  };
  structuredData: string[];
  issues: {
    type: 'error' | 'warning' | 'info';
    message: string;
  }[];
} 