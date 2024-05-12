import { Router } from "express";
import multer from "multer";
import path from "path";
import * as authController from "../controllers/authController";
import * as beerController from "../controllers/beerController";
import * as docsController from "../controllers/docsController";
import * as reviewController from "../controllers/reviewController";
import { requireAuth } from "../middlewares/authMiddleware";
import validate from "../middlewares/validateRequest";
import valMulter from "../middlewares/validateMulterRequest";
import * as AuthVal from "../validators/authValidator";
import * as BVal from "../validators/beerValidator";

const upload = multer({ dest: path.resolve(__dirname, "../../uploads") });

const router = Router();

router.get("/", docsController.docs_get);

router.post("/auth/signup", validate(AuthVal.signup), authController.signup_post);
router.post("/auth/signin", validate(AuthVal.signin), authController.signin_post);
router.post("/auth/logout", requireAuth, authController.logout_post);
router.get("/auth/status", requireAuth, authController.status_get);

router.post(
	"/beer/add",
	[requireAuth, upload.array("photos", 4), valMulter, validate(BVal.add)],
	beerController.add_post,
);
router.get("/beer/get", [requireAuth], beerController.get_get);
router.post("/beer/del", [requireAuth, validate(BVal.del)], beerController.del_post);
router.post(
	"/beer/edit",
	[requireAuth, upload.array("photos", 4), valMulter, validate(BVal.edit)],
	beerController.edit_post,
);

router.post("/review/add", requireAuth, reviewController.add_post);

export default router;
