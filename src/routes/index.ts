import express from 'express';
const router  = express.Router();
import apiRoutes from './api';

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/test', (_req, res) => {
  res.json({msg:'Hello Test!'});
 });
 //_req el primer elemento que va a manejar un express es
 //una request JSON
 /**
  * el segundo parametro es un
  * elemento que nos va a ayudar a mandar una respuesta
  * y esto toma valores.
  * El tercero es lo que hace que el
  * siguiente registro se ejecute
  */

 router.use('/api', apiRoutes);

export default router;
