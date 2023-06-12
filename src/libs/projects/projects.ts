import {ProjectDao} from '@dao/models/ProjectsDao';
/**que se ocupara para el projecto */
export interface IProject{
    _id?: string;//para decirle que el atributo es opcional ponemos "?"
    name: string;
    description: string;
    isActive: boolean;
    createAt?: Date;
    updatedAt?: Date;
}

const ProjectDaoInstance = new ProjectDao();

export const createProject = (project: IProject) =>{
    /**
     * creamos un nuevo proyecto y esto trae
     * el nombre, la descripcion y si esta activo.
     */
    return ProjectDaoInstance.create(project);

}

//para tener todas las colecciones
export const getProjects =async () => {
    return ProjectDaoInstance.find({});
};

export const getProject =async (id:string) => {
  return ProjectDaoInstance.findOne(id);
};
/**
 * el partial lo que hace es que la interface a pesar
 * de que todos tengan los atributos obligatorios o no
 * el partial lo que hace es que ahora
 * todos los datos sean opcionales
 */
export const updateProject = ( id:string, project:Partial<IProject>) => {
    return ProjectDaoInstance.update(id, project);
  }

  export const deleteProject = (id:string) => {
    return ProjectDaoInstance.delete(id);
  }