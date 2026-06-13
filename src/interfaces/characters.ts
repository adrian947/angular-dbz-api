export interface Characters {
  items: Item[];
  meta:  Meta;
  links: Links;
}

export interface Item {
  id:          number;
  name:        string;
  ki:          string;
  maxKi:       string;
  race:        string;
  gender:      Gender;
  description: string;
  image:       string;
  affiliation: Affiliation;
  deletedAt:   null;
}

export enum Affiliation {
  ArmyOfFrieza = "Army of Frieza",
  Freelancer = "Freelancer",
  ZFighter = "Z Fighter",
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  M = "M",
  F = "F",
}

export interface Links {
  first:    string;
  previous: string;
  next:     string;
  last:     string;
}

export interface Meta {
  totalItems:   number;
  itemCount:    number;
  itemsPerPage: number;
  totalPages:   number;
  currentPage:  number;
}

export interface OriginPlanet {
  id:          number;
  name:        string;
  isDestroyed: boolean;
  description: string;
  image:       string;
}

export interface Transformation {
  id:    number;
  name:  string;
  image: string;
  ki:    string;
}

export interface CharacterDetail {
  id:              number;
  name:            string;
  ki:              string;
  maxKi:           string;
  race:            string;
  gender:          string;
  description:     string;
  image:           string;
  affiliation:     string;
  originPlanet?:   OriginPlanet;
  transformations: Transformation[];
}
