export interface ContactInformation {
  icon: string;
  text: string;
}

export interface ContactWhatsapp {
  text: string;
  url: string;
  phone: string;
}

export interface SocialMedia {
  icon: string;
  url: string;
}

export interface Copyright {
  company: string;
  year: string;
  text: string;
}

export interface FooterData {
  contactInformation: ContactInformation[];
  contactWhatsapp: ContactWhatsapp[];
  social_media: SocialMedia[];
  copyright: Copyright[];
}
