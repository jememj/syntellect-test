import { flow, makeAutoObservable } from "mobx";

import { getCountryByName } from "../../api/apiService";

import type { AutocompleteViewModelParams, IAutocompleteViewModel, SuggestionItem } from "./autocomplete-control.types";

export class AutocompleteControlViewModel implements IAutocompleteViewModel {
  private _inputValue: string = "";
  private _selectedSuggestion: SuggestionItem | null = null;
  private _suggestions: SuggestionItem[] = [];
  private _error: string | null = null;
  private _maxSuggestions: number;

  constructor({ maxSuggestions }: AutocompleteViewModelParams) {
    makeAutoObservable(this);
    this._maxSuggestions = maxSuggestions ?? 5;
  }

  public setValue = (newValue: string) => {
    this._inputValue = newValue;
    if (this._selectedSuggestion) this._selectedSuggestion = null;
  };

  public fetchSuggestions = flow(function* (this: AutocompleteControlViewModel) {
    if (!this.inputValue.trim()) {
      this._suggestions = [];
      this._selectedSuggestion = null;
      this._error = null;
      return;
    }

    try {
      this._error = null;

      const data: SuggestionItem[] = yield getCountryByName(this.inputValue);

      const uniqueSuggestions = data.reduce((acc: SuggestionItem[], current) => {
        if (!acc.some((item) => item.name === current.name)) {
          acc.push(current);
        }
        return acc;
      }, []);

      this._suggestions = uniqueSuggestions.slice(0, this._maxSuggestions);
    } catch (err) {
      this._error = "Ошибка";
    }
  });

  public selectSuggestion = (suggestion: SuggestionItem) => {
    this._selectedSuggestion = suggestion;
    this.clearSuggestions();
  };

  public clearSuggestions = () => {
    this._suggestions = [];
  };

  public clearSelectedSuggestion = () => {
    this._selectedSuggestion = null;
  };

  get inputValue() {
    return this._inputValue;
  }

  get selectedSuggestion() {
    return this._selectedSuggestion;
  }

  get suggestions() {
    return this._suggestions;
  }

  get error() {
    return this._error;
  }
}
