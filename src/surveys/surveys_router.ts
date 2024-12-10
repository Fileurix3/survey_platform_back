import { Router } from "express";
import { SurveysServices } from "./surveys_services.js";
import { authMiddleware } from "../middleware/auth_middleware.js";

const router = Router();
const surveysServices = new SurveysServices();

router.post("/create", authMiddleware, surveysServices.createSurvey);
router.get("/get/:surveyId", surveysServices.getSurveyById);
router.delete("/delete/:surveyId", authMiddleware, surveysServices.deleteSurvey);
router.get("/get/result/:surveyId", authMiddleware, surveysServices.getResultSurvey);
router.post("/answer/:surveyId", surveysServices.answerTheSurvey);

export default router;
