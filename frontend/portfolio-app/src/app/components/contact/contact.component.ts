import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  loading = false;
  submitted = false;
  success = false;
  error = '';
  
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private analyticsService: AnalyticsService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  isFieldInvalid(field: string): boolean {
    const formControl = this.contactForm.get(field);
    return formControl ? (formControl.invalid && (formControl.dirty || formControl.touched)) : false;
  }
  
  onSubmit(): void {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    this.loading = true;
    this.submitted = false;
    this.error = '';
    
    this.contactService.submitContactForm(this.contactForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.submitted = true;
        this.success = true;
        this.contactForm.reset();
        this.analyticsService.logContactFormSubmission();
        this.analyticsService.logEvent('form_submit', {
          form_name: 'contact_form',
          form_length: this.calculateFormLength()
        });
      },
      error: (err) => {
        console.error('İletişim formu gönderilirken hata oluştu:', err);
        this.loading = false;
        this.submitted = true;
        this.success = false;
        this.error = 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta ile iletişime geçin.';
      }
    });
  }
  
  private calculateFormLength(): number {
    let length = 0;
    if (this.contactForm) {
      const nameLength = this.contactForm.get('name')?.value?.length || 0;
      const emailLength = this.contactForm.get('email')?.value?.length || 0;
      const messageLength = this.contactForm.get('message')?.value?.length || 0;
      length = nameLength + emailLength + messageLength;
    }
    return length;
  }
}
