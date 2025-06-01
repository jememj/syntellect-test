import { TextControlComponent } from "./components/text-control/text-control.component";
import { TextControlViewModel } from "./components/text-control/text-control.model";
import { AutocompleteControlViewModel } from "./components/autocomplete-control/autocomplete-control.model";
import { AutocompleteControlComponent } from "./components/autocomplete-control/autocomplete-control.component";

import "./App.css";

const firstControlModel = new TextControlViewModel({
  rightButtons: [
    {
      text: "Очистить",
      callback: () => {
        firstControlModel.setValue("");
      },
    },
    {
      text: "Ввести привет",
      callback: () => {
        firstControlModel.setValue("Hello world!");
      },
    },
  ],
});

const secondControlModel = new TextControlViewModel({
  leftButtons: [
    {
      text: "Проверить число",
      callback: (currentValue) => {
        if (!isNaN(Number(currentValue)) && currentValue) {
          alert(`Введеное число: ${currentValue}`);
        } else {
          alert("Введено невалидное число");
        }
      },
    },
  ],
  rightButtons: [
    {
      text: "Вывести в модальном окне",
      callback: (currentValue) => {
        if (currentValue) alert(currentValue);
      },
    },
  ],
});

const firstAutocompleteModel = new AutocompleteControlViewModel({ maxSuggestions: 3 });
const secondAutocompleteModel = new AutocompleteControlViewModel({ maxSuggestions: 10 });

function App() {
  return (
    <div className="app-container">
      <h3>Контрол с 2 кнопками справа</h3>
      <TextControlComponent model={firstControlModel} />
      <h3>Контрол с 1 кнопкой справа и 1 кнопкой слева;</h3>
      <TextControlComponent model={secondControlModel} placeholder="Напишите текст или цифры" />

      <h3>Автокомплит с макс. 3 предложениями</h3>
      <AutocompleteControlComponent model={firstAutocompleteModel} />
      <h3>Автокомплит с макс. 10 предложениями</h3>
      <AutocompleteControlComponent model={secondAutocompleteModel} />
    </div>
  );
}

export default App;
