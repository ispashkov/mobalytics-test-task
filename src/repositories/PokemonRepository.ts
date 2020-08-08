import AbstractRepository from "./AbstractRepository";
import { Pokemon } from "../typings";

export class PokemonRepository extends AbstractRepository<Pokemon> {
  readonly endpoint = "/pokemon";
}

export const PokemonRepoInstance = new PokemonRepository();
