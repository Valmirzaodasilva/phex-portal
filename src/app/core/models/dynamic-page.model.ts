import { DynamicComponentModel } from './dynamic-component.model';

export interface DynamicPageModel {
  id?: number;
  order?: number;
  name?: string;
  title?: string;
  subtitle?: string;
  menuPortalName?: string;
  menuPortalUrl?: string;
  dynamicComponents?: DynamicComponentModel[];
}
