import { Document, Types } from 'mongoose';
export type ProposalDocument = Proposal & Document;
export declare class Proposal {
    productId: Types.ObjectId;
    title: string;
    description: string;
    aiGenerated: boolean;
    sustainabilityMetrics: Record<string, any>;
    content: Record<string, any>;
    status: string;
}
export declare const ProposalSchema: import("mongoose").Schema<Proposal, import("mongoose").Model<Proposal, any, any, any, Document<unknown, any, Proposal> & Proposal & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Proposal, Document<unknown, {}, import("mongoose").FlatRecord<Proposal>> & import("mongoose").FlatRecord<Proposal> & {
    _id: Types.ObjectId;
}>;
