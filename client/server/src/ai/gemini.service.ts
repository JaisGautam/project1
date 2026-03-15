// import { Injectable } from '@nestjs/common';

// import { ConfigService } from '../config/config.service';  // ✅ Tumhara ConfigService
// import { AILoggerService } from '../logger/AILogger.service';

// @Injectable()
// export class GeminiService {
//   constructor(
//     private configService: ConfigService,  // ✅ NestJS inject karega
//     private aiLogger: AILoggerService,
//   ) {
//     // ✅ Constructor mein hi check kar lo
//     const key = this.configService.getGeminiApiKey();
//     console.log('🔑 GeminiService initialized with key');
//   }

//   async generateContent(
//   prompt: string,
//   module: string,
//   temperature: number = 0.3,
//   maxTokens: number = 500
// ): Promise<string> {
//   try {
//     const apiKey = this.configService.getGeminiApiKey();
    
//     // ✅ Use correct model name - choose ONE:
//     const modelName = 'gemini-2.5-flash';  // Latest (recommended)
//     // OR
//     // const modelName = 'gemini-2.0-flash';  // Stable
    
//     console.log(`📡 Calling Gemini API with model: ${modelName}`);
    
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }],
//           generationConfig: {
//             temperature,
//             maxOutputTokens: maxTokens,
//           },
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('❌ Gemini API Error:', errorData);
//       throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
//     }

//     const data = await response.json();
//     const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

//     await this.aiLogger.logInteraction({
//       module,
//       prompt,
//       response: content,
//       status: 'success',
//     });

//     return content;
    
//   } catch (error) {
//     console.error('❌ GeminiService error:', error.message);
//     await this.aiLogger.logInteraction({
//       module,
//       prompt,
//       response: '',
//       status: 'error',
//       error: error.message,
//     });
//     throw error;
//   }
// }
// }

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AILoggerService } from '../logger/AILogger.service';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);

  constructor(
    private configService: ConfigService,
    private aiLogger: AILoggerService,
  ) {
    this.logger.log('GeminiService initialized');
  }

  async generateContent(
    prompt: string,
    module: string,
    temperature: number = 0.3,
    maxTokens: number = 500
  ): Promise<string> {
    try {
      const apiKey = this.configService.getGeminiApiKey();
      
      // Using gemini-1.5-flash for better compatibility
      const modelName = 'gemini-1.5-flash';
      
      this.logger.log(`📡 Calling Gemini API with model: ${modelName}`);
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ text: prompt }] 
            }],
            generationConfig: {
              temperature,
              maxOutputTokens: maxTokens,
              topP: 0.8,
              topK: 40,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        this.logger.error('❌ Gemini API Error:', errorData);
        throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      await this.aiLogger.logInteraction({
        module,
        prompt,
        response: content,
        status: 'success',
      });

      return content;
      
    } catch (error) {
      this.logger.error('❌ GeminiService error:', error.message);
      await this.aiLogger.logInteraction({
        module,
        prompt,
        response: '',
        status: 'error',
        error: error.message,
      });
      throw error;
    }
  }

  async generateSustainabilityProposal(productData: any): Promise<string> {
    const prompt = `
      Generate a sustainability improvement proposal for the following product:
      Product Name: ${productData.name}
      Category: ${productData.category}
      Current Price: ${productData.price}
      Description: ${productData.description || 'No description provided'}
      
      Please provide:
      1. 3 specific recommendations to improve sustainability
      2. Estimated carbon footprint reduction
      3. Potential cost implications
      4. Implementation timeline
      
      Format the response in a clear, structured way.
    `;
    
    return this.generateContent(prompt, 'sustainability-proposal', 0.4, 800);
  }
}