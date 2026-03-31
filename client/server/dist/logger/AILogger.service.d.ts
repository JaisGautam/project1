import { Model } from 'mongoose';
import { AILogDocument } from '../Database/schemas/aiLog.schema';
export interface AILogData {
    module: string;
    prompt: string;
    response: string;
    tokens?: number;
    status: 'success' | 'error';
    error?: string;
}
export declare class AILoggerService {
    private aiLogModel;
    constructor(aiLogModel: Model<AILogDocument>);
    logInteraction(data: AILogData): Promise<AILogDocument>;
    getLogsByModule(module: string, limit?: number): Promise<AILogDocument[]>;
    getRecentLogs(limit?: number): Promise<AILogDocument[]>;
    getErrorLogs(limit?: number): Promise<AILogDocument[]>;
}
