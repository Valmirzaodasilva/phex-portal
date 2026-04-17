export interface ContactInformationModel {
  icon: string;
  text: string;
}

export interface ContactWhatsappModel {
  text: string;
  url: string;
  phone: string;
}

export interface SocialMediaModel {
  icon: string;
  url: string;
}

export interface CopyrightModel {
  company: string;
  year: string;
  text: string;
}

export interface FooterModel {
  contactInformation: ContactInformationModel[];
  contactWhatsapp: ContactWhatsappModel[];
  social_media: SocialMediaModel[];
  copyright: CopyrightModel[];
  logoUrl?: string;
  description?: string;
}
