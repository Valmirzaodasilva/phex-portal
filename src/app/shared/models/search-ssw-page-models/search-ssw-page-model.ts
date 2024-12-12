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
  inputSSW?: InputSearchModel[];
  menuPortalName?: string;
  menuPortalUrl?: string;

  value?: any; // DOC: VALOR DO INPUT UTILIZADO SOMENTE NO FRONT
}

export class InputSearchModel {
  name: string;
  type: INPUT_TYPE_ENUM; // TEXT | NUMBER | DATE ...
  size: number; // SIZE do type, olhar na doc do SSW
  required: boolean;
  description: string;
  screenSize: number;
  options?: string[]; // TODO: ADICIONAR PARA SELECT NO FRONT E BACKEND
  idSearchPage: number; // FK
  idInputSearch?: number; // FK SE FOR ARRAY FILHO
  inputsArray?: InputSearchModel[]; // UTILIZADO PARA ARRAY NO FRONT
}
