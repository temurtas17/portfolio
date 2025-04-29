import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  loading = false;
  error = '';

  constructor(
    private projectService: ProjectService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
    
    // Ana sayfa için SEO bilgileri ve yapılandırılmış veri
    this.seoService.updateTags({
      title: 'Ana Sayfa',
      description: 'Mustafa Temurtaş, Angular ve Node.js konusunda uzmanlaşmış Full Stack Geliştirici. Modern ve kullanıcı dostu web uygulamaları geliştiriyorum.',
      url: 'https://www.temurtas.net/'
    });
    
    // Yapılandırılmış veriyi ekle
    this.addStructuredData();
  }

  loadFeaturedProjects(): void {
    this.loading = true;
    this.projectService.getFeaturedProjects().subscribe({
      next: (projects) => {
        this.featuredProjects = projects;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching featured projects:', err);
        this.error = 'Projeler yüklenemedi. Lütfen daha sonra tekrar deneyin.';
        this.loading = false;
      }
    });
  }
  
  private addStructuredData(): void {
    // Varolan JSON-LD script etiketini kaldır
    const existingScript = document.getElementById('homeJsonLd');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Person tipi yapılandırılmış veri
    const personJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Mustafa Temurtaş',
      'jobTitle': 'Full Stack Geliştirici',
      'url': 'https://www.temurtas.net',
      'sameAs': [
        'https://github.com/temurtas17',
        'https://linkedin.com/in/mustafa-temurtas-140b8415a'
      ],
      'knowsAbout': ['Angular', 'Node.js', 'TypeScript', 'JavaScript', 'Web Development']
    };
    
    // WebSite tipi yapılandırılmış veri
    const websiteJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Mustafa Temurtaş - Full Stack Geliştirici',
      'url': 'https://www.temurtas.net',
      'description': 'Mustafa Temurtaş, Angular ve Node.js konusunda uzmanlaşmış Full Stack Geliştirici portfolyo sitesi.',
      'author': {
        '@type': 'Person',
        'name': 'Mustafa Temurtaş'
      }
    };
    
    // Verileri sayfaya ekle
    const personScript = document.createElement('script');
    personScript.id = 'homeJsonLd';
    personScript.type = 'application/ld+json';
    personScript.text = JSON.stringify(personJsonLd);
    document.head.appendChild(personScript);
    
    const websiteScript = document.createElement('script');
    websiteScript.id = 'websiteJsonLd';
    websiteScript.type = 'application/ld+json';
    websiteScript.text = JSON.stringify(websiteJsonLd);
    document.head.appendChild(websiteScript);
  }
}