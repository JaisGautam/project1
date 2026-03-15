// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type ProposalDocument = Proposal & Document;

// @Schema()
// export class Proposal {
//   // ✅ Required fields
//   @Prop({ required: true })
//   proposalId: string;

//   @Prop({ required: true })
//   budget: number;

//   @Prop({ required: true })
//   companyType: string;

//   @Prop({ required: true })
//   totalCost: number;

//   @Prop({ required: true })
//   budgetRemaining: number;

//   // ✅ Optional fields (using ?)
//   @Prop()
//   sustainabilityGoals?: string[];

//   @Prop({ type: Array })
//   productMix?: Array<{
//     name: string;
//     quantity: number;
//     unitPrice: number;
//     total: number;
//   }>;

//   @Prop({ type: Object })
//   impactSummary?: {
//     plasticSavedKg: number;
//     carbonAvoidedKg: number;
//     localSourcingPercent: number;
//   };

//   @Prop({ default: Date.now })
//   createdAt?: Date;

//   // ✅ Extra optional fields
//   @Prop()
//   title?: string;

//   @Prop()
//   description?: string;

//   @Prop()
//   category?: string;

//   @Prop()
//   timeline?: number;

//   @Prop()
//   estimatedBudget?: number;

//   @Prop()
//   estimatedRoi?: number;
// }

// export const ProposalSchema = SchemaFactory.createForClass(Proposal);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProposalDocument = Proposal & Document;

@Schema({ timestamps: true })
export class Proposal {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  aiGenerated: boolean;

  @Prop({ type: Object })
  sustainabilityMetrics: Record<string, any>;

  @Prop({ type: Object })
  content: Record<string, any>;

  @Prop({ default: 'draft' })
  status: string;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);