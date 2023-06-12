import * as File from 'fs';
import { DaoBase } from "./DaoBase";
import { IProject } from "@server/libs/projects/projects";

export class ProjectDao extends DaoBase<IProject>{

    private memoryProjects: IProject[] =[];
    private createdProjects = 0;

    public create(item: IProject): Promise<IProject> {
        const newProject = { ...item };//shallow copy
        newProject._id = (++this.createdProjects).toString();
        newProject.createAt = new Date();
        newProject.updatedAt = newProject.createAt;
        this.memoryProjects.push(newProject);
        this.serialize();
        return Promise.resolve(newProject);
    }
    public update(id: string, item: Partial<IProject>): Promise<IProject> {
            /* Obtenemos el indice del proyecto basados en el id,
    si obtenemos un -1 es que no encontró ninguna coincidencia
    el méotodo findIndex utiliza una función donde se compara un parametro con el
    valor del objecto que se esta iterando, si se evalua la comparación en verdadero,
    se asigna el indice del objeto iterado.
    */
        const index = this.memoryProjects.findIndex(p => p._id === id);
        if (index === -1) throw new Error('Project not found');
    // Usamos <<< spread operators ...variable >>> para extraer todas las llaves de un objeto con sus valores
    // en este caso se destructura el projecto en el indice, el valor pasado desde el que
    // llama la función y un atributo para actualizar la fecha de actualización,
    // los atributos similares van sobreescribiendo los atributos ya asignados por tanto
    // los atributos de memoryProjects[index] son sobreescritos con los atributos de project
    // y el atributo updatedAt se sobreescribe con el nuevo Date.
        this.memoryProjects[index] = { ...this.memoryProjects[index], ...item, updatedAt: new Date() };
        this.serialize();
        return Promise.resolve(this.memoryProjects[index]);
    }
    public delete(id: string): Promise<boolean> {
        const index = this.memoryProjects.findIndex(p => p._id === id);
        if (index === -1) throw new Error('Project not found');
        this.memoryProjects.splice(index, 1);
        this.serialize();
        return Promise.resolve(true);
    }
    public find(item: Partial<IProject>): Promise<IProject[]> {
        return Promise.resolve(this.memoryProjects);
    }
    public findOne(id: string): Promise<IProject> {
        //mira a ver si hay un project con ese id
        const project = this.memoryProjects.find(p => p._id === id);
        if(!project) throw new Error('Project not found');
        return Promise.resolve(project);
    }
    private serialize():void{
        const data =JSON.stringify({memoryProjects: this.memoryProjects, createdProjects: this.createdProjects});
        File.writeFileSync('projects.json', data);
    }
    private deserialize():void{
        try{
        const data =File.readFileSync('projects.json', 'utf8');
        const {memoryProjects, createdProjects} = JSON.parse(data);
        this.memoryProjects = memoryProjects;
        this.createdProjects = createdProjects;
        }catch(error){
            console.log('Error reading projects.json', error);
        }
    }
    constructor(){
        super();
        this.deserialize();
    }
    //seminariost2023
}