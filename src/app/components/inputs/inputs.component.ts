import { Component, Input } from '@angular/core';
import { INPUT_TYPE_ENUM } from 'src/app/shared/models/input-type.enum';
import { InputSearchModel } from 'src/app/shared/models/search-ssw-page-models/search-ssw-page-model';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent {
  @Input() dataInputSearchSSW: InputSearchModel;

  get isInputTypeText(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.TEXT;
  }
  
  get isInputTypeTextarea(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.TEXTAREA;
  }

  get isInputTypeNumber(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.NUMBER;
  }

  get isInputTypeObject(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.OBJECT;
  }

  get isInputTypeArray(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.ARRAY;
  }

  get isInputTypeBoolean(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.BOOLEAN;
  }

  get isInputTypeDate(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.DATE;
  }

  get isInputTypeDatetime(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.DATETIME;
  }

  get isInputTypeImage(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.IMAGE;
  }

  get isInputTypePassword(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.PASSWORD;
  }

  get isInputTypeSelect(): boolean {
    return this.dataInputSearchSSW.type === INPUT_TYPE_ENUM.SELECT;
  }
}
