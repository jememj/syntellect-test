import countries from "./countries.json";

export interface CountryInfo {
  name: string;
  fullName: string;
  flag: string;
}

export async function getCountryByName(countryName: string, signal?: AbortSignal): Promise<CountryInfo[]> {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }
      resolve();
    }, getRandom(100, 800));

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(signal.reason);
      },
      { once: true }
    );
  }).then(() => {
    if (typeof countryName !== "string" || !countryName) {
      return [];
    }

    const searchText = countryName.toLocaleLowerCase();

    return countries.filter((x) => x.name.toLocaleLowerCase().startsWith(searchText) || x.fullName.toLocaleLowerCase().startsWith(searchText));
  });
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
