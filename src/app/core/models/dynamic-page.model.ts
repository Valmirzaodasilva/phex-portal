export type ComponentType =
  | 'TITLE'
  | 'TEXT'
  | 'BUTTON'
  | 'PRINCIPLES_CARD'
  | 'INFORMATION_CARD'
  | 'SERVICE_CARD'
  | 'BANNER';

export type AlignType = 'LEFT' | 'CENTER' | 'RIGHT';

export interface DataComponent {
  id?: number;
  icon?: string;
  url?: string;
  text?: string;
  textColor?: string;
  title?: string;
  alignment?: AlignType;
  subtitle?: string;
  textButton?: string;
  linkButton?: string;
  iconSize?: string;
  screenSize?: number;
  fontSize?: number;
  images?: string[];
  idDynamicComponent: number;
}

export interface DynamicComponent {
  id?: number;
  order?: number;
  type: ComponentType;
  componenData: DataComponent[];
  idDynamicPage: number;
}

export interface DynamicPageData {
  id?: number;
  order?: number;
  name?: string;
  title?: string;
  subtitle?: string;
  menuPortalName?: string;
  menuPortalUrl?: string;
  dynamicComponents?: DynamicComponent[];
}
