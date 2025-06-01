export interface SuggestionItem {
  name: string;
  fullName: string;
  flag: string;
}

export interface AutocompleteViewModelParams {
  maxSuggestions?: number;
}

export interface IAutocompleteViewModel {
  setValue: (newValue: string) => void;
  fetchSuggestions: () => void;
  selectSuggestion: (suggestion: SuggestionItem) => void;
  clearSuggestions: () => void;
  clearSelectedSuggestion: () => void;
  get inputValue(): string;
  get error(): string | null;
  get suggestions(): SuggestionItem[];
  get selectedSuggestion(): SuggestionItem | null;
}
