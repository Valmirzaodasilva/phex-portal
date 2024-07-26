import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  CarouselData,
  DataComponentModel,
} from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataBannerModel {
  title: string;
  subtitle: string;
  textColor: string;
  fontSize: number;
  url: string;
  image: string;
  // idDynamicDataComponent
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, OnDestroy {
  @Input() data: DataComponentModel;

  dataDisplay: Array<DataBannerModel>;
  sliderNumber = 0;

  timeSliderInternal: any;

  ngOnInit(): void {
    this.dataDisplay = this.data as Array<DataBannerModel>;
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
    this.sliderNumber < this.dataDisplay?.length - 1
      ? this.sliderNumber++
      : (this.sliderNumber = 0);
    this.initTimerSlider();
  }

  previousSlide(): void {
    clearInterval(this.timeSliderInternal);
    this.sliderNumber > 0
      ? this.sliderNumber--
      : (this.sliderNumber = this.dataDisplay?.length - 1);
    this.initTimerSlider();
  }

  get isMultipleCarouselImages(): boolean {
    return this.dataDisplay?.length > 1;
  }
}
