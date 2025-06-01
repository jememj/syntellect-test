import { CSSProperties, memo } from "react";

import styles from "./suggestion-item.module.css";

import type { SuggestionItem } from "../autocomplete-control.types";

interface SuggestionItemProps {
  suggestion: SuggestionItem;
}

export const SuggestionItemComponent = memo(({ suggestion }: SuggestionItemProps) => (
  <>
    <img className={styles["autocomplete__suggestion-flag"]} src={suggestion.flag} alt="Флаг" />
    <div>
      <div className={styles["autocomplete__suggestion-name"]}>{suggestion.name}</div>
      <div className={styles["autocomplete__suggestion-fullname"]}>{suggestion.fullName}</div>
    </div>
  </>
));
