import { Router } from "express";
import { SurveysServices } from "./surveys_services.js";
import { authMiddleware } from "../middleware/auth_middleware.js";

const router = Router();
const surveysServices = new SurveysServices();

router.post("/create", authMiddleware, surveysServices.createSurvey);
router.get("/get/:surveyId", surveysServices.getSurveyById);
router.delete("/delete", authMiddleware, surveysServices.deleteSurvey);
router.post("/answer", surveysServices.answerTheSurvey);

export default router;
