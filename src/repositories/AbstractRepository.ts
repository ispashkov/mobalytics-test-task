import { Repository, Pageable, Resource } from "typings";
import api from "utils/api";

export default abstract class AbstractRepository<E> implements Repository<E> {
  public readonly endpoint: string = "/";

  public getAll = async (): Promise<Pageable<Resource>> => {
    const { data } = await api.get<Pageable<Resource>>(this.endpoint);

    return data;
  };

  public getByName = async (name: string): Promise<E> => {
    const { data } = await api.get<E>(`${this.endpoint}/${name}`);

    return data;
  };
}
