export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChampionBasic {
  id: string;
  key: string;
  name: string;
  title: string;
  image: ChampionImage;
  blurb: string;
  tags: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: any;
  partype: string;
}

export interface ChampionPassive {
  name: string;
  description: string;
  image: ChampionImage;
}

export interface ChampionFull extends ChampionBasic {
  lore: string;
  passive: ChampionPassive;
  spells: any[];
  skins: any[];
  allytips: string[];
  enemytips: string[];
}