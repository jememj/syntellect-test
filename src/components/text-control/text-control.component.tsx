import { observer } from "mobx-react";

import { TextControlViewModel } from "./text-control.model";

import styles from "./text-control.module.css";

import type { ButtonConfig } from "./text-control.types";

interface TextControlProps {
  model: TextControlViewModel;
  placeholder?: string;
}

export const TextControlComponent = observer(({ model, placeholder }: TextControlProps) => {
  const hasLeftButtons = model.leftButtons.length > 0;
  const hasRightButtons = model.rightButtons.length > 0;

  const renderButtonGroup = (buttons: ButtonConfig[]) => (
    <div className={styles.textControl__buttons}>
      {buttons.map((button, index) => (
        <button key={index} onClick={() => model.handleButtonClick(button)}>
          {button.text}
        </button>
      ))}
    </div>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    model.setValue(e.target.value);
  };

  return (
    <div className={styles.textControl}>
      {hasLeftButtons && renderButtonGroup(model.leftButtons)}
      <input type="text" value={model.value} onChange={handleInputChange} placeholder={placeholder} />
      {hasRightButtons && renderButtonGroup(model.rightButtons)}
    </div>
  );
});
