import { Request, Response, NextFunction } from 'express';
import { Document, ObjectId } from 'mongoose';
import { MessageContent } from 'openai/resources/beta/threads/messages';

// success object returned by services
export interface Success {
  success: boolean;
  message: string;
  content?: MessageContent[];
  token?: string;
}

// TS interface for User Doc
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _id: ObjectId;
}
