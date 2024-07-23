export class FooterModel {
  contact_information: Array<ContactInformationModel>;
  contact_whatsapp: Array<ContactWhatsappModel>;
  social_media: Array<SocialMediasModel>;
  copyright: Array<CopyrightModel>;
}

class ContactInformationModel {
  icon: string;
  text: string;
}

class ContactWhatsappModel {
  text: string;
  url: string;
  phone: string;
}

class SocialMediasModel {
  icon: string;
  url: string;
}

class CopyrightModel {
  company: string;
  year: string;
  text: string;
}
