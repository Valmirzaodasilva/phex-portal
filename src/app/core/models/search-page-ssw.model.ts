import { AlignEnum, InputTypeEnum } from './enums';

export interface InputSearchModel {
  name: string;
  type: InputTypeEnum;
  size?: number;
  required: boolean;
  description: string;
  screenSize?: number;
  options?: string[];
  idSearchPage?: number;
  idInputSearch?: number;
  inputsArray?: InputSearchModel[];
}

export interface SearchSSWPageModel {
  id?: number;
  order?: number;
  name?: string;
  title?: string;
  subtitle?: string;
  endpoint?: string;
  hasClearButton?: boolean;
  buttonAlignments?: AlignEnum;
  buttonConfirmText?: string;
  buttonConfirmColor?: string;
  buttonClearText?: string;
  buttonClearColor?: string;
  inputSSW?: InputSearchModel[];
  menuPortalName?: string;
  menuPortalUrl?: string;
}
