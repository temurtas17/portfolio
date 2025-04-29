import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private sitemapUrl = 'https://www.temurtas.net/sitemap.xml';
  private baseUrl = 'https://www.temurtas.net';

  constructor(
    private http: HttpClient,
    private projectService: ProjectService
  ) {}

  /**
   * Dinamik sitemap XML oluşturur
   */
  generateSitemap(): Observable<string> {
    return this.projectService.getAllProjects().pipe(
      map(projects => this.buildSitemapXml(projects))
    );
  }

  /**
   * Sitemap'i oluştur
   */
  private buildSitemapXml(projects: Project[]): string {
    const today = new Date().toISOString().split('T')[0];
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Ana sayfalar
    const pages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: 'about', priority: '0.8', changefreq: 'monthly' },
      { url: 'projects', priority: '0.9', changefreq: 'weekly' },
      { url: 'contact', priority: '0.7', changefreq: 'monthly' }
    ];
    
    // Sabit sayfaları ekle
    pages.forEach(page => {
      xml += this.createUrlEntry(
        `${this.baseUrl}/${page.url}`,
        today,
        page.changefreq,
        page.priority
      );
    });
    
    // Proje sayfalarını ekle
    projects.forEach(project => {
      xml += this.createUrlEntry(
        `${this.baseUrl}/projects/${project._id}`,
        project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : today,
        'weekly',
        '0.8'
      );
    });
    
    xml += '</urlset>';
    return xml;
  }

  /**
   * Sitemap için URL girişi oluşturur
   */
  private createUrlEntry(url: string, lastmod: string, changefreq: string, priority: string): string {
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  }

  /**
   * Sunucuya sitemap yükleme (backend tarafında uygulanmalı)
   */
  uploadSitemap(sitemapXml: string): Observable<any> {
    // Bu kısım backend API ile entegre edilmeli
    // Şu anda sadece önizleme olarak dönüş yapıyor
    console.log('Generated sitemap:', sitemapXml);
    return new Observable(observer => {
      observer.next({ success: true });
      observer.complete();
    });
  }
} 