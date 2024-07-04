import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  CarouselData,
  DataComponentModel,
} from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataHeroModel {
  title: string;
  carousel: Array<CarouselData>;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() data: DataComponentModel;

  dataDisplay: DataHeroModel;
  sliderNumber = 0;

  timeSliderInternal: any;

  private FIRST_INDEX = 0;

  ngOnInit(): void {
    this.dataDisplay = this.data[this.FIRST_INDEX];
    this.initTimerSlider();
  }

  ngOnDestroy(): void {
    clearInterval(this.timeSliderInternal);
  }

  initTimerSlider(): void {
    this.timeSliderInternal = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    clearInterval(this.timeSliderInternal);
    this.sliderNumber < this.dataDisplay?.carousel?.length - 1
      ? this.sliderNumber++
      : (this.sliderNumber = 0);
    this.initTimerSlider();
  }

  previousSlide(): void {
    clearInterval(this.timeSliderInternal);
    this.sliderNumber > 0
      ? this.sliderNumber--
      : (this.sliderNumber = this.dataDisplay?.carousel?.length - 1);
    this.initTimerSlider();
  }

  getUrlAssets(url: string): string {
    return `assets/imgs/${url}`;
  }

  get isMultipleCarouselImages(): boolean {
    return this.dataDisplay?.carousel?.length > 1;
  }
}
