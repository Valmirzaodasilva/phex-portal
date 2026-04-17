export interface MenuPortal {
  id: number;
  name: string;
  url: string;
  idDynamicPage?: number;
  idSearchPageSSW?: number;
  order: number;
}

export interface ConfigPortal {
  logoUrl?: string;
  displayContactsPage?: boolean;
  displayCoveragePage?: boolean;
}

export interface FooterData {
  contactInformation: ContactInfo[];
  contactWhatsapp: ContactWhatsapp;
  socialMedias: SocialMedia[];
  copyright: Copyright;
}

export interface ContactInfo {
  id: number;
  icon: string;
  text: string;
}

export interface ContactWhatsapp {
  text: string;
  url: string;
  phone: string;
}

export interface SocialMedia {
  id: number;
  icon: string;
  url: string;
}

export interface Copyright {
  company: string;
  year: string;
  text: string;
}

export interface DynamicPageData {
  id: number;
  title: string;
  subtitle: string;
  components: DynamicComponent[];
}

export interface DynamicComponent {
  id: number;
  type: 'TEXT' | 'BUTTON' | 'PRINCIPLES_CARD' | 'INFORMATION_CARD' | 'SERVICE_CARD' | 'BANNER';
  order: number;
  data: DynamicDataComponent;
}

export interface DynamicDataComponent {
  id?: number;
  icon?: string;
  url?: string;
  text?: string;
  textColor?: string;
  title?: string;
  alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  subtitle?: string;
  nameButton?: string;
  linkButton?: string;
  iconSize?: string;
  fontSize?: string;
  screenSize?: number;
  images?: string[];
  color?: string;
  items?: DynamicDataComponent[];
}

export interface SearchPageSSWData {
  id: number;
  title: string;
  endpoint: string;
  hasClearButton: boolean;
  buttonAlignments: 'LEFT' | 'CENTER' | 'RIGHT';
  buttonConfirmText: string;
  buttonConfirmColor: string;
  buttonClearText?: string;
  buttonClearColor?: string;
  inputs: InputSSW[];
}

export interface InputSSW {
  id: number;
  name: string;
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'PASSWORD';
  size: number;
  required: boolean;
  description: string;
  screenSize: number;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  response: T;
  message?: string;
}
