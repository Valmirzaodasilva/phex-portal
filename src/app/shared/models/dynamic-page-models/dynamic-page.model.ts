import { ComponentTypeEnum } from '../../enums/component-type-enum.enum';

export class DynamicPageModel {
  title?: string;
  subtitle?: string;
  components?: Array<DynamicComponentModel>;
}

export class DynamicComponentModel {
  type: ComponentTypeEnum;
  data: Array<DataComponentModel>;
}

export class DataComponentModel {
  icon?: string;
  url?: string;
  text?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  sizeIcon?: string;
  sizeMobile?: number;
  sizeTablet?: number;
  sizeDesktop?: number;
  images?: Array<string>;
  carousel?: Array<CarouselData>;
}

export class CarouselData {
  title?: string;
  subtitle?: string;
  url: string;
}

// export class ItemDataComponentModel {
//   title?: string;
//   text?: string;
//   subtitle?: string;
//   icon?: string;
//   image?: string;
//   buttonText?: string;
//   buttonLink?: string;
//   sizeIcon?: string;
//   sizeMobile?: string;
//   sizeTablet?: string;
//   sizeDesktop?: string;
// }
