import { Request, Response, Router } from 'express'
import { router as rootRoutes } from './rootRoutes'

export const router = Router()

router.use(rootRoutes)

// 404
router.use((req: Request, res: Response) => {
	res.status(404).send('E404')
})
