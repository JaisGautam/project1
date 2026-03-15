

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AILog, AILogDocument } from '../Database/schemas/aiLog.schema';

// ✅ Define the interface properly
export interface AILogData {
  module: string;           // ✅ Add this
  prompt: string;
  response: string;
  tokens?: number;
  status: 'success' | 'error';
  error?: string;
}

@Injectable()
export class AILoggerService {
  constructor(
    @InjectModel(AILog.name) private aiLogModel: Model<AILogDocument>,
  ) {}

  // ✅ Update method signature
  async logInteraction(data: AILogData): Promise<AILogDocument> {
    try {
      const log = new this.aiLogModel({
        ...data,
        timestamp: new Date(),
      });
      
      const saved = await log.save();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[AI Log] Module: ${data.module}, Status: ${data.status}`);
      }
      
      return saved;
    } catch (error) {
      console.error('Failed to save AI log:', error);
      throw error;
    }
  }

  async getLogsByModule(module: string, limit = 100): Promise<AILogDocument[]> {
    return this.aiLogModel
      .find({ module })
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec();
  }

  async getRecentLogs(limit = 50): Promise<AILogDocument[]> {
    return this.aiLogModel
      .find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec();
  }

  async getErrorLogs(limit = 50): Promise<AILogDocument[]> {
    return this.aiLogModel
      .find({ status: 'error' })
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec();
  }
}