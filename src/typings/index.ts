export interface Repository<E> {
  readonly endpoint: string;
  getAll(): Promise<Pageable<Resource>>;
  getByName(name: string): Promise<E>;
}

export type Pageable<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

export type Resource = {
  name: string;
  url: string;
};

export type Ability = {
  ability: Resource;
  is_hidden: boolean;
  slot: number;
};

export type GameIndex = {
  game_index: number;
  version: Resource;
};

export type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: Resource;
  version_group: Resource;
};

export type Move = {
  move: Resource;
  version_group_details: Array<VersionGroupDetail>;
};

export type SpritesVersionsImages = {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
};

export type Sprites = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    };
  };
  versions: {
    "generation-i": {
      "red-blue": SpritesVersionsImages;
      yellow: SpritesVersionsImages;
    };
  };
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: Resource;
};

export type Type = {
  slot: number;
  type: Resource;
};

export type Pokemon = {
  abilities: Array<Ability>;
  base_experience: number;
  forms: Array<Resource>;
  game_indices: Array<GameIndex>;
  height: number;
  held_items: Array<unknown>;
  id: number;
  is_default: boolean;
  location_area_encounters: number;
  moves: Array<Move>;
  name: string;
  order: number;
  species: Resource;
  sprites: Sprites;
  stats: Array<Stat>;
  types: Array<Type>;
  weight: number;
};
