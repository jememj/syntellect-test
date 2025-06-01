import { makeAutoObservable } from "mobx";

import type { ButtonConfig, ITextControlViewModel, TextControlViewModelParams } from "./text-control.types";

export class TextControlViewModel implements ITextControlViewModel {
  private _value: string = "";
  private _leftButtons: ButtonConfig[];
  private _rightButtons: ButtonConfig[];

  constructor({ leftButtons, rightButtons }: TextControlViewModelParams) {
    makeAutoObservable(this);
    this._leftButtons = leftButtons ?? [];
    this._rightButtons = rightButtons ?? [];
  }

  public setValue(newValue: string) {
    this._value = newValue;
  }

  public handleButtonClick(button: ButtonConfig) {
    button.callback(this.value);
  }

  get value() {
    return this._value;
  }

  get leftButtons(): ButtonConfig[] {
    return this._leftButtons;
  }

  get rightButtons(): ButtonConfig[] {
    return this._rightButtons;
  }
}
