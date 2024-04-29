import { Router } from 'express'
import * as rootController from '../controllers/rootController'
import rootValidator from '../validators/rootValidator'
import handleValidation from '../middlewares/handleValidation'

export const router = Router()
const mws = [handleValidation.handleValidationError]

router.get('/', rootValidator.checkRootGet(), mws, rootController.root_get)
