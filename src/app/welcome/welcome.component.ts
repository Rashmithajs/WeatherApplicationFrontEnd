import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Contact, Weather } from '../weather.model';
import { WeatherService } from '../weather.service';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  currentCity: string = '';
  forecastCity: string = '';
  historyCity: string = '';
  currentWeather: Weather | null = null;
  historyData: Weather | null = null;
  forecastData: Weather | null = null;

  contactForm: FormGroup;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  getCurrentWeather() {
    if (this.currentCity) {
      this.weatherService.getWeather(this.currentCity).subscribe((data: Weather) => {
        this.currentWeather = data;
        this.openModal(data, 'current');
      });
    }
  }

  getHistory() {
    this.weatherService.getHistory(this.historyCity).subscribe((data: Weather) => {
      this.historyData = data;
      this.openModal(data, 'history');
    });
  }

  getForecast() {
    this.weatherService.getForecast(this.forecastCity).subscribe((data: Weather) => {
      this.forecastData = data;
      this.openModal(data, 'forecast');
    });
  }

  openModal(data: Weather, type: string): void {
    this.dialog.open(WeatherModalComponent, {
      data: {
        currentWeather: type === 'current' ? data : null,
        historyData: type === 'history' ? data : null,
        forecastData: type === 'forecast' ? data : null,
      },
      width: '45%',
      height: '70%'
    });
  }

  onSubmitContactForm() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value); // Debugging line
      const contact: Contact = this.contactForm.value;
      this.contactService.submitContactForm(contact).subscribe(response => {
        console.log('Contact form submitted successfully', response);
        this.contactForm.reset();
      }, error => {
        console.error('Error submitting contact form', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  navigateToWeather() {
    this.router.navigate(['/weather']);
  }

  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
