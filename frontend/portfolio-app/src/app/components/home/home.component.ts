import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

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

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
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
}