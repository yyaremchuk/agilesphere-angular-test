import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Weather } from '../model/weather';

@Injectable()
export class WeatherService {
  private url: string = 'https://api.openweathermap.org/data/2.5/forecast';
  private params: { [key: string]: string } = {
    q: '',
    cnt: '9',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951'
  };

  constructor(private http: HttpClient) { }

  public searchWeatherForCity(city: string): Observable<Weather> {
    const params: { [key: string]: string } = {
      ...this.params,
      q: city
    };
    return this.http.get<Weather>(this.url, { params }).pipe(
      catchError((err: any) => {
        console.log('error => ', err);
        return Observable.throw(err);
      })
    );
  }
}
