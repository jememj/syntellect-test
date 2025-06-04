import React, { useState, useRef, useEffect, useCallback } from "react";
import { observer } from "mobx-react";

import { AutocompleteControlViewModel } from "./autocomplete-control.model";
import { SuggestionItemComponent } from "./suggestion-item/suggestion-item.component";
import { debounce } from "../../shared/utils/debounce";

import styles from "./autocomplete-control.module.css";

import type { SuggestionItem } from "./autocomplete-control.types";

interface AutocompleteControlProps {
  model: AutocompleteControlViewModel;
}

export const AutocompleteControlComponent = observer(({ model }: AutocompleteControlProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        model.clearSuggestions();
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [model]);

  useEffect(() => {
    if (isFocused) {
      model.clearSelectedSuggestion();
      model.fetchSuggestions();
    }
  }, [isFocused, model]);

  const handleSuggestionClick = (suggestion: SuggestionItem) => {
    model.selectSuggestion(suggestion);
    setIsFocused(false);
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(() => {
      model.fetchSuggestions();
    }, 300),
    [model]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    model.setValue(e.target.value);
    debouncedFetchSuggestions();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <div ref={wrapperRef} className={styles["autocomplete-container"]}>
      <input type="text" value={model.selectedSuggestion ? "" : model.inputValue} onChange={handleInputChange} onFocus={handleInputFocus} className={styles.autocomplete__input} />
      {model.selectedSuggestion && (
        <div className={styles["autocomplete__selected-value"]}>
          <SuggestionItemComponent suggestion={model.selectedSuggestion} />
        </div>
      )}

      {model.error && <div className={styles["autocomplete__error"]}>{model.error}</div>}

      {isFocused && model.suggestions.length > 0 && (
        <ul className={styles["autocomplete__suggestions"]}>
          {model.suggestions.map((suggestion: SuggestionItem, index: number) => (
            <li key={`${suggestion.name}${index}`} onClick={() => handleSuggestionClick(suggestion)} className={styles["autocomplete__suggestion"]}>
              <SuggestionItemComponent suggestion={suggestion} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
