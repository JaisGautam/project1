// import { Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import OpenAI from 'openai';
// import { prompts } from './prompts';

// @Injectable()
// export class OpenAIService {
//   private openai: OpenAI;
//   private readonly logger = new Logger(OpenAIService.name);

//   constructor(private configService: ConfigService) {
//     const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    
//     if (!apiKey) {
//       throw new Error('OPENAI_API_KEY is not defined');
//     }

//     this.openai = new OpenAI({
//       apiKey: apiKey,
//     });
//   }

//   async generateProductAndCategories(input: {
//     productName?: string;
//     productDescription: string;
//     industry?: string;
//   }) {
//     try {
//       const prompt = prompts.productAndCategoryGeneration(input);
      
//       const completion = await this.openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a sustainability expert. Generate product details and categories.'
//           },
//           {
//             role: 'user',
//             content: prompt
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 2000,
//       });

//       const response = completion.choices[0]?.message?.content;
      
//       if (!response) {
//         throw new Error('No response from OpenAI');
//       }

//       const parsedResponse = JSON.parse(response);
      
//       return {
//         data: parsedResponse,
//         usage: {
//           totalTokens: completion.usage?.total_tokens || 0,
//         },
//       };

//     } catch (error) {
//       this.logger.error(`Error: ${error.message}`);
//       throw error;
//     }
//   }

//   async generateSustainabilityCategories(input: {
//     productName?: string;
//     productDescription: string;
//     industry?: string;
//   }) {
//     try {
//       const prompt = prompts.categoryGeneration(input);
      
//       const completion = await this.openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a sustainability expert. Generate categories.'
//           },
//           {
//             role: 'user',
//             content: prompt
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 2000,
//       });

//       const response = completion.choices[0]?.message?.content;
      
//       if (!response) {
//         throw new Error('No response from OpenAI');
//       }

//       const parsedResponse = JSON.parse(response);
      
//       return {
//         data: parsedResponse,
//         usage: {
//           totalTokens: completion.usage?.total_tokens || 0,
//         },
//       };

//     } catch (error) {
//       this.logger.error(`Error: ${error.message}`);
//       throw error;
//     }
//   }

//   async generateSustainabilityProposal(input: {
//     title: string;
//     description: string;
//     category: string;
//     goals?: string[];
//     constraints?: string;
//   }) {
//     try {
//       const prompt = prompts.proposalGeneration(input);
      
//       const completion = await this.openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a sustainability consultant. Create proposals.'
//           },
//           {
//             role: 'user',
//             content: prompt
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 2500,
//       });

//       const response = completion.choices[0]?.message?.content;
      
//       if (!response) {
//         throw new Error('No response from OpenAI');
//       }

//       const parsedResponse = JSON.parse(response);
      
//       return {
//         data: parsedResponse,
//         usage: {
//           totalTokens: completion.usage?.total_tokens || 0,
//         },
//       };

//     } catch (error) {
//       this.logger.error(`Error: ${error.message}`);
//       throw error;
//     }
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompts } from './prompts';

@Injectable()
export class GeminiService {

  private readonly logger = new Logger(GeminiService.name);
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {

    const apiKey = this.configService.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateProductAndCategories(input: {
    productName?: string;
    productDescription: string;
    industry?: string;
  }) {

    try {

      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = prompts.productAndCategoryGeneration({
        productName: input.productName || "",
        productDescription: input.productDescription
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        data: text
      };

    } catch (error) {
      this.logger.error(`Gemini Error: ${error.message}`);
      throw error;
    }
  }

  async generateSustainabilityCategories(input: {
    productName?: string;
    productDescription: string;
    industry?: string;
  }) {

    try {

      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = prompts.categoryGeneration({
        productName: input.productName || "",
        productDescription: input.productDescription
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;

      return {
        data: response.text()
      };

    } catch (error) {
      this.logger.error(`Gemini Error: ${error.message}`);
      throw error;
    }
  }

  async generateSustainabilityProposal(input: {
    title: string;
    description: string;
    category: string;
    goals?: string[];
    constraints?: string;
  }) {

    try {

      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = prompts.proposalGeneration({
        budget: 1000,
        companyType: input.category,
        goals: input.goals || []
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;

      return {
        data: response.text()
      };

    } catch (error) {
      this.logger.error(`Gemini Error: ${error.message}`);
      throw error;
    }
  }
}