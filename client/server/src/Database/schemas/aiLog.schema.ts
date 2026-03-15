

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type AILogDocument = AILog & Document;

// @Schema()
// export class AILog {
//   @Prop({ required: true })
//   module: string;           // ✅ Add this field

//   @Prop({ required: true, type: String })
//   prompt: string;

//   @Prop({ type: String })
//   response: string;

//   @Prop()
//   tokens?: number;

//   @Prop({ required: true, enum: ['success', 'error'] })
//   status: string;

//   @Prop()
//   error?: string;

//   @Prop({ default: Date.now })
//   timestamp: Date;
// }

// export const AILogSchema = SchemaFactory.createForClass(AILog);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AILogDocument = AILog & Document;

@Schema({ timestamps: true })
export class AILog {
  @Prop({ required: true })
  module: string;

  @Prop({ required: true, type: String })
  prompt: string;

  @Prop({ type: String })
  response: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  error: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const AILogSchema = SchemaFactory.createForClass(AILog);