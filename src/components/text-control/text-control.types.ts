export interface ButtonConfig {
  text: string;
  callback: (currentValue: string) => void;
}

export interface TextControlViewModelParams {
  leftButtons?: ButtonConfig[];
  rightButtons?: ButtonConfig[];
}

export interface ITextControlViewModel {
  setValue: (newValue: string) => void;
  handleButtonClick: (button: ButtonConfig) => void;
  get value(): string;
  get leftButtons(): ButtonConfig[];
  get rightButtons(): ButtonConfig[];
}
