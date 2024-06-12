export interface PropsCard {
  cardName: string;
  cardDescription: string;
  cardImages: string[];
  cardPrice: string;
  cardDiscounted: string;
  discountedName: DataValueDiscountedName | undefined;
  isCardBestseller: boolean;
  cardKey: string;
}

export interface DataDiscountedName {
  name: string;
  value: DataValueDiscountedName[];
}

export interface DataValueDiscountedName {
  key: string;
  label: string;
}
