export  interface ITeam {
    id?: string;
    name: string;
    description: string;
    members?: string[];
    owner?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
// export  interface IPrueba {
//   name: string;
//   edad: number;
//   status?: string;
// }
// export  interface ITeam {
//   isEnabled: boolean;
// }
const memoryProjects: ITeam[] =[];
let createdProjects = 0;

/**
 * el ... es un spread operator que hace un shallow copy
 */

export const createProject = async(project: ITeam) =>{
    const newProject = { ...project };//shallow copy
    newProject.id = (++createdProjects).toString();
    newProject.createdAt = new Date();
    newProject.updatedAt = newProject.createdAt;
    memoryProjects.push(newProject);
    return newProject;

}

//para tener todas las colecciones
export const getProjects =async () => {
    return memoryProjects;
};

export const getProject =async (id:string) => {
  //mira a ver si hay un project con ese id
  const project = memoryProjects.find(p => p.id === id);
  if(!project) throw new Error('Project not found');
  return project;
};

/**
 * el partial lo que hace es que la interface a pesar
 * de que todos tengan los atributos obligatorios o no
 * el partial lo que hace es que ahora
 * todos los datos sean opcionales
 */
export const updateProject = ( id:string, project:Partial<ITeam>) => {
    const index = memoryProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    memoryProjects[index] = { ...memoryProjects[index], ...project, updatedAt: new Date() };
    return memoryProjects[index];
  }
  export const deleteProject = (id:string) => {
    const index = memoryProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    memoryProjects.splice(index, 1);
    return true;
  }