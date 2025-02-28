import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

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
    private projectService: ProjectService
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
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.error = 'Proje detayları yüklenemedi. Lütfen daha sonra tekrar deneyin.';
        this.loading = false;
      }
    });
  }
}
