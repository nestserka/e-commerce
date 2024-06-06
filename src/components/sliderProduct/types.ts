export interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

export interface SliderProps {
  images: Image[] | undefined;
}
