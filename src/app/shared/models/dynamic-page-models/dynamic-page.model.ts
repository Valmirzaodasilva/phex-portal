import { ComponentTypeEnum } from '../../enums/component-type-enum.enum';

export class DataComponentModel {
  url?: string;
  text?: string;
  title?: string;
  subtitle?: string;
  sizeMobile?: number;
  sizeTablet?: number;
  sizeDesktop?: number;
  images?: Array<string>;
  carousel?: Array<CarouselData>;
  items?: Array<{
    title: string;
    subtitle: string;
    image: string;
  }>;
}

export class DynamicComponentModel {
  type: ComponentTypeEnum;
  data: Array<DataComponentModel>;
}

export class DynamicPageModel {
  title?: string;
  subtitle?: string;
  components?: Array<DynamicComponentModel>;
}

export class CarouselData {
  title?: string;
  subtitle?: string;
  url: string;
}
