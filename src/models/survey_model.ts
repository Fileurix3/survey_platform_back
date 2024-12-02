import mongoose, { Schema, Types } from "mongoose";

export interface ISurveyModel {
  _id: Types.ObjectId;
  creatorId: Types.ObjectId;
  name: string;
  questions: Record<string, string>;
  answerCount: Record<string, number>;
  createdAt: Date;
}

const surveySchema = new Schema<ISurveyModel>({
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: Map,
    of: String,
    required: true,
  },
  answerCount: {
    type: Map,
    of: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const SurveyModel = mongoose.model<ISurveyModel>("Surveys", surveySchema);
