import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  completionDate?: Date;
  features?: string[];
  challenges?: {
    title: string;
    description: string;
  }[];
  images?: {
    url: string;
    caption?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    technologies: { type: [String], required: true },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    completionDate: { type: Date },
    features: { type: [String] },
    challenges: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true }
      }
    ],
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema); 