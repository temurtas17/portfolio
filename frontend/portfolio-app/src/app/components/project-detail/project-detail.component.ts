import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  loading = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private seoService: SeoService,
    private analyticsService: AnalyticsService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProject(id);
      } else {
        this.router.navigate(['/projects']);
      }
    });
  }
  
  loadProject(id: string): void {
    this.loading = true;
    this.error = null;
    
    this.projectService.getProjectById(id).subscribe({
      next: (project) => {
        this.project = project;
        this.loading = false;
        
        // Proje bilgilerine göre SEO meta etiketlerini güncelle
        if (project) {
          // Açıklama için ilk 160 karakteri kullan
          const description = project.description.length > 160 
            ? `${project.description.substring(0, 157)}...` 
            : project.description;
            
          this.seoService.updateTags({
            title: project.title,
            description: description,
            image: project.imageUrl,
            url: `https://www.temurtas.net/projects/${project._id}`
          });
          
          // Structured data ekleme (JSON-LD)
          this.addStructuredData(project);
          
          // Analytics'e proje görüntüleme bildirimi
          if (project._id) {
            this.analyticsService.logProjectView(project._id, project.title);
          }
        }
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.error = 'Proje detayları yüklenemedi. Lütfen daha sonra tekrar deneyin.';
        this.loading = false;
      }
    });
  }
  
  /**
   * Projenin harici linklerine tıklama takibi
   */
  trackExternalLinkClick(url: string, linkType: string): void {
    this.analyticsService.logExternalLinkClick(url, linkType);
  }
  
  private addStructuredData(project: Project): void {
    // Varolan JSON-LD script etiketini kaldır (yeniden yüklemeler için)
    const existingScript = document.getElementById('projectJsonLd');
    if (existingScript) {
      existingScript.remove();
    }
    
    // JSON-LD formatında yapılandırılmış veri oluştur
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': project.title,
      'description': project.description,
      'image': project.imageUrl,
      'author': {
        '@type': 'Person',
        'name': 'Mustafa Temurtaş',
        'url': 'https://www.temurtas.net/about'
      },
      'datePublished': project.completionDate,
      'url': `https://www.temurtas.net/projects/${project._id}`,
      'keywords': project.technologies.join(', ')
    };
    
    // JSON-LD script etiketini sayfaya ekle
    const script = document.createElement('script');
    script.id = 'projectJsonLd';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}
