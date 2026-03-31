import { Document } from 'mongoose';
export type AILogDocument = AILog & Document;
export declare class AILog {
    module: string;
    prompt: string;
    response: string;
    status: string;
    error: string;
    metadata: Record<string, any>;
}
export declare const AILogSchema: import("mongoose").Schema<AILog, import("mongoose").Model<AILog, any, any, any, Document<unknown, any, AILog> & AILog & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AILog, Document<unknown, {}, import("mongoose").FlatRecord<AILog>> & import("mongoose").FlatRecord<AILog> & {
    _id: import("mongoose").Types.ObjectId;
}>;
