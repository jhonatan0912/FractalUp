export interface Country {
  name: string;
  continent: Continent;
  image?: string;
  emojiU: string;
}

export interface Continent {
  name: string;
  code: string;
  image?: string;
}