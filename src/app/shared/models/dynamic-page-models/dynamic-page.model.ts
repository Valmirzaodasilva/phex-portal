import { ALIGN_ENUM } from '../../enums/align-enum.enum';
import { COMPONENT_TYPE_ENUM } from '../../enums/component-type-enum.enum';

export class DynamicPageModel {
  id?: number;
  order?: number;
  name?: string;
  title?: string;
  subtitle?: string;
  menuPortalName?: string; // Used only in the front-end
  menuPortalUrl?: string; // Used only in the front-end
  dynamicComponents?: Array<DynamicComponentModel>;
}

export class DynamicComponentModel {
  id?: number;
  order?: number;
  type: COMPONENT_TYPE_ENUM;
  componenData: Array<DataComponentModel>;
  idDynamicPage: number;
}

export class DataComponentModel {
  id?: number;
  icon?: string;
  url?: string;
  text?: string;
  textColor?: string;
  title?: string;
  alignment?: ALIGN_ENUM;
  subtitle?: string;
  textButton?: string;
  linkButton?: string;
  iconSize?: string;
  screenSize?: number;
  images?: Array<string>;
  idDynamicComponent: number;
}
