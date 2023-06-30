import { Router } from 'express'
import * as rootController from '../controllers/rootController'
import * as beerController from '../controllers/beerController'
import rootValidator from '../validators/rootValidator'
import handleValidation from '../middlewares/handleValidation'

export const router = Router()
const mws = [handleValidation.handleValidationError]

router.get('/', rootValidator.checkRootGet(), mws, rootController.root_get)

router.post('/api/v1/beer/add', beerController.add_post)
router.post('/api/v1/beer/del', beerController.del_post)
router.post('/api/v1/beer/edit', beerController.edit_post)
router.get('/api/v1/beer/get', beerController.get_get)

router.post('/api/v1/review/add', beerController.add_post)
router.post('/api/v1/review/del', beerController.del_post)