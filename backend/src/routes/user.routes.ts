import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", asyncHandler(userController.list));
router.get("/:id", asyncHandler(userController.getById));
router.post("/", asyncHandler(userController.create));
router.put("/:id", asyncHandler(userController.update));
router.delete("/:id", asyncHandler(userController.remove));

export default router;
