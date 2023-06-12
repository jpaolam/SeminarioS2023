import { IProject } from "@server/libs/projects/projects";

export abstract class DaoBase <T> {
    /**
     * la definimos como que es tipo generico
     * no se puede instanciar directamente
     * lo que permite es que otra clase la instancie
     */
    public abstract create(item: T): Promise<T>;
    public abstract update(id: string, item: Partial<T>): Promise<IProject>;
    public abstract delete(id: string):Promise<boolean>;
    public abstract find(item: Partial<T>): Promise<T[]>;
    public abstract findOne(id: string): Promise<T>;
}