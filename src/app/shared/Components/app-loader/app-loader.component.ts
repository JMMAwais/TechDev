import { Component } from '@angular/core';
import { LoadingService } from '../loader';


@Component({
  selector: 'app-app-loader',
  imports: [],
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.css'
})
export class AppLoaderComponent {
    constructor(public loaderService:LoadingService){}
  }
