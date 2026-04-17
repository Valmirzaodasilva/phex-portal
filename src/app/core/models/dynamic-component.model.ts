import { AlignEnum, ComponentTypeEnum } from './enums';

export interface DataComponentModel {
  id?: number;
  icon?: string;
  url?: string;
  text?: string;
  textColor?: string;
  title?: string;
  alignment?: AlignEnum;
  subtitle?: string;
  textButton?: string;
  linkButton?: string;
  nameButton?: string;
  color?: string;
  fontSize?: number;
  iconSize?: number;
  screenSize?: number;
  images?: string[];
  idDynamicComponent?: number;
}

export interface DynamicComponentModel {
  id?: number;
  order?: number;
  type: ComponentTypeEnum;
  componenData: DataComponentModel[];
  idDynamicPage?: number;
}
