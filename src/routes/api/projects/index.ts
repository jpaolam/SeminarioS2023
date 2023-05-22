import  express  from "express";
const router = express.Router();

router.get('/', (_req, res) =>{
    res.json({version:1, scope:'projects'});
});

router.get('/echo/:msg', (_req, res)=>{
    const {msg} = _req.params;
    const {variable1 = "Hola", variable2 = "Mundo"} = _req.query;
    res.json({msg, variable1, variable2});
});
router.post('/echo2', (_req, res)=>{
    const { variable1 = "Hola", variable2 = "Mundo" } = _req.body;
    res.json({ variable1, variable2 });
});

//TAREA
router.post('/tarea', (_req, res)=>{
    const { nombre = "Jessie", apellido = "Martel", edad =20 } = _req.body;
    res.json({ nombre, apellido, edad });
});

export default router;