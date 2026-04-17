export type InputType = 'TEXT' | 'NUMBER' | 'DATE' | 'PASSWORD' | 'SELECT';

export interface InputSSW {
  name: string;
  type: InputType;
  size: number;
  required: boolean;
  description: string;
  screenSize: number;
  options?: string[];
  idSearchPage: number;
  idInputSearch?: number;
  inputsArray?: InputSSW[];
}

export interface SearchPageSSWData {
  order?: number;
  name?: string;
  title?: string;
  endpoint?: string;
  hasClearButton?: boolean;
  buttonAlignments?: string;
  buttonConfirmText?: string;
  buttonConfirmColor?: string;
  buttonClearText?: string;
  buttonClearColor?: string;
  inputSSW?: InputSSW[];
  menuPortalName?: string;
  menuPortalUrl?: string;
}
