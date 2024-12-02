import { Request, Response } from "express";
import { CustomError, handlerError } from "../index.js";
import { ISurveyModel, SurveyModel } from "../models/survey_model.js";
import redisClient from "../redis/redis.js";
import jwt from "jsonwebtoken";

export class SurveysServices {
  public async createSurvey(req: Request, res: Response): Promise<void> {
    const { name, questions } = req.body;

    try {
      if (!name || !questions) {
        throw new CustomError("All fields must be filled in", 400);
      } else if (!Array.isArray(questions)) {
        throw new CustomError("The questions field must be an array", 400);
      }

      const tokenDecode = jwt.decode(req.cookies.token);
      const userId: string = (tokenDecode as { userId: string }).userId;

      const newSurvey: ISurveyModel = await SurveyModel.create({
        creatorId: userId,
        name: name,
        questions: questions.reduce((acc, val, i) => {
          acc[i + 1] = val;
          return acc;
        }, {} as Record<string, string>),
        answerCount: questions.reduce((acc, val, i) => {
          acc[i + 1] = 0;
          return acc;
        }, {} as Record<string, number>),
      });

      res.status(201).json({
        message: "Survey has been successfully created",
        survey: newSurvey,
      });
    } catch (err: unknown) {
      handlerError(err, res);
    }
  }

  public async getSurveyById(req: Request, res: Response): Promise<void> {
    const surveyId = req.params.surveyId;

    try {
      const survey: ISurveyModel | null = await SurveyModel.findById(surveyId);

      if (survey == null) {
        throw new CustomError("Survey not found", 404);
      }

      res.status(200).json({
        survey,
      });
    } catch (err: unknown) {
      handlerError(err, res);
    }
  }

  public async getRandomSurvey(req: Request, res: Response): Promise<void> {
    try {
    } catch (err: unknown) {
      handlerError(err, res);
    }
  }

  public async answerTheSurvey(req: Request, res: Response): Promise<void> {
    const { surveyId, answerChoice } = req.body;
    let userId = req.cookies.userId;

    try {
      if (!surveyId) {
        throw new CustomError("You must enter the survey Id", 400);
      } else if (!answerChoice) {
        throw new CustomError("Select an answerChoice", 400);
      }

      if (userId) {
        const redisKey = `answered:${userId}:surveyId:${surveyId}`;
        const isAnswered = await redisClient.get(redisKey);

        if (isAnswered) {
          throw new CustomError("You've already answered this survey", 403);
        }
        redisClient.setEx(redisKey, 7 * 24 * 60 * 60, "answered");
      } else if (!userId) {
        userId = crypto.randomUUID();
        res.cookie("userId", userId, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "lax",
        });

        const redisKey = `answered:${userId}:surveyId:${surveyId}`;
        redisClient.setEx(redisKey, 7 * 24 * 60 * 60, "answered");
      }

      const survey: ISurveyModel | null = await SurveyModel.findById(surveyId).lean();

      if (survey == null) {
        throw new CustomError("Survey not found", 404);
      } else if (!survey.questions[answerChoice]) {
        throw new CustomError(`Option number ${answerChoice} doesn't exist`, 400);
      }

      const updateSurvey = await SurveyModel.updateOne(
        { _id: surveyId },
        {
          $inc: { [`answerCount.${answerChoice}`]: 1 },
        }
      );

      if (updateSurvey.modifiedCount === 0) {
        throw new CustomError("No changes made to the survey", 400);
      }

      res.status(200).json({
        message: "You have successfully voted",
        updateSurvey,
      });
    } catch (err: unknown) {
      handlerError(err, res);
    }
  }
}
