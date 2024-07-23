import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor() {}

  async getFontAwesomeIcon(formattedIconName: string): Promise<IconDefinition> {
    try {
      if (formattedIconName) {
        const { [formattedIconName]: icon }: any = await import(
          /* webpackChunkName: "fa-icons" */ `@fortawesome/free-solid-svg-icons`
        );
        if (!icon) {
          throw new Error(
            `Icon ${formattedIconName} does not exist in @fortawesome/free-solid-svg-icons`
          );
        }
        return icon;
      } else {
        throw new Error(`Icon name is undefined`);
      }
    } catch (error) {
      console.error(`Icon ${formattedIconName} could not be loaded`, error);
      throw error;
    }
  }

  async getBrandFontAwesomeIcon(
    formattedIconName: string
  ): Promise<IconDefinition> {
    try {
      if (formattedIconName) {
        const { [formattedIconName]: icon }: any = await import(
          /* webpackChunkName: "fa-icons" */ `@fortawesome/free-brands-svg-icons`
        );
        if (!icon) {
          throw new Error(
            `Icon ${formattedIconName} does not exist in @fortawesome/free-brands-svg-icons`
          );
        }
        return icon;
      } else {
        throw new Error(`Icon name is undefined`);
      }
    } catch (error) {
      console.error(`Icon ${formattedIconName} could not be loaded`, error);
      throw error;
    }
  }
}
