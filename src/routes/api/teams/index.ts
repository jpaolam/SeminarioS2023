import { createProject, getProjects, updateProject, deleteProject, getProject } from "@server/libs/teams/teams";
import  express  from "express";
const router = express.Router();

router.get('/', (_req, res) =>{
    res.json({version:1, scope:'projects'});
});

//metodo para hacer consultas: get
router.get('/all',async (_req, res) => {
    //el guion bajo lo usamos cuando declararemos la variable pero no se usara
    try {
        const projects = await getProjects();
        return res.json(projects);
    } catch (ex: any) {
        return res.status(500).json({error: ex?.message});
    }
});

router.get('/byid/:id',async (req, res) => {
    try {
        const { id = ''} = req.params;
        const project = await getProject(id);
        return res.json(project);
    } catch (ex:any) {
        return res.status(500).json({error: ex?.message});
    }
})

//si no fuera async
// router.get('/all', (_req, res) => {
//     getProjects()
//         .then(projects => res.json(projects))
//         .catch(ex => res.status(500).json({error: ex?.message}));
// });

router.post('/new', async (req, res) => {
    try{
        const { name= '', description= '', members = '',owner = '', status = 'ACT' } =req.body;
        const newProject = { name, description, members,owner, status };
        const createdProject = await createProject(newProject);
        return res.json(createdProject);
    }catch(ex: any){
        return res.status(500).json({error: ex?.message});
    }
});

router.put('/upd/:id',async (req, res) => {
    try{
        const { id = ''} = req.params;
        const { name= '', description= '',members = '', owner = '', status = 'ACT' } = req.body;
        const updatedProject = await updateProject(id, { name, description,members,owner, status });
        return res.json(updatedProject);
    }catch(ex: any){
        return res.status(500).json({error: ex?.message});
    }

});

router.delete('/del/:id',async (req, res) => {
    try{
        const { id = ''} = req.params;
        const deletedProject = await deleteProject(id);
        return res.json({deleted: deletedProject, id});
    }catch(ex: any){
        return res.status(500).json({error: ex?.message});
    }
});

export default router;