import { ALIGN_ENUM } from '../../enums/align-enum.enum';
import { INPUT_TYPE_ENUM } from '../input-type.enum';

export class SearchSSWPageModel {
  order?: number;
  name?: string;
  title?: string;
  endpoint?: string;
  hasClearButton?: boolean;
  buttonAlignments?: ALIGN_ENUM;
  buttonConfirmText?: string;
  buttonConfirmColor?: string;
  buttonClearText?: string;
  buttonClearColor?: string;
  inputs?: InputSearchModel[];
  menuPortalName?: string;
  menuPortalUrl?: string;
}

export class InputSearchModel {
  name: string;
  type: INPUT_TYPE_ENUM; // TEXT | NUMBER | DATE ...
  size: number; // SIZE do type, olhar na doc do SSW
  required: boolean;
  description: string;
  screenSize: number;
  idSearchPage: number; // FK
}
