//unir exportacion de project, securitis y teams
/**
 * Aaqui lo que vamos a hacer es crear todas las rutas de las
 * carpetas que creamos
 */
import express from 'express';
const router = express.Router();
import projectRouter from './projects';
import securityRouter from './security';
import teamsRouter from './teams';

router.use('/projects', projectRouter);
router.use('/security', securityRouter);
router.use('/teams', teamsRouter);

export default router;