export interface Country {
  name: string;
  continent: Continent;
  code: string;
  image?: string;
  capital?: string;
  currencies?: string[];
  languages?: Language[];
}

export interface Continent {
  name: string;
  code: string;
  image?: string;
}

export interface Language {
  name: string;
}