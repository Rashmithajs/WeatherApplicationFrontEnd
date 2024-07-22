import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Weather } from '../weather.model';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.css']
})
export class WeatherModalComponent {

  historyData: Weather | null = null;
  forecastData: Weather | null = null;
  currentWeather: Weather | null = null;

  constructor(
    public dialogRef: MatDialogRef<WeatherModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize data
    this.historyData = data.historyData || null;
    this.forecastData = data.forecastData || null;
    this.currentWeather = data.currentWeather || null;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
