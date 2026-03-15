// // // // import { Injectable } from '@nestjs/common';
// // // // import { ConfigService as NestConfigService } from '@nestjs/config';  // ✅ NestJS ka built-in config use karo

// // // // @Injectable()
// // // // export class ConfigService {
// // // //   constructor(private configService: NestConfigService) {}  // ✅ Inject NestJS ConfigService

// // // //   getGeminiApiKey(): string {
// // // //     const key = this.configService.get<string>('GEMINI_API_KEY');  // ✅ NestJS config se lo
// // // //     console.log('🔑 Gemini API Key loaded:', key ? 'Yes' : 'No');  // Debug log
    
// // // //     if (!key) {
// // // //       throw new Error('GEMINI_API_KEY is not defined in environment variables');
// // // //     }
// // // //     return key;
// // // //   }

// // // //   getMongoUri(): string {
// // // //     return this.configService.get<string>('MONGODB_URI');
// // // //   }

// // // //   getPort(): number {
// // // //     return this.configService.get<number>('PORT') || 5000;
// // // //   }
// // // // }


// // // import { Injectable } from '@nestjs/common';
// // // import { ConfigService as NestConfigService } from '@nestjs/config';

// // // @Injectable()
// // // export class ConfigService {
// // //   constructor(private configService: NestConfigService) {}

// // //   getGeminiApiKey(): string {
// // //     const key = this.configService.get<string>('GEMINI_API_KEY');

// // //     if (!key) {
// // //       throw new Error('GEMINI_API_KEY not found');
// // //     }

// // //     return key;
// // //   }

// // //   getMongoUri(): string {
// // //     const uri = this.configService.get<string>('MONGODB_URI');

// // //     if (!uri) {
// // //       throw new Error('MONGODB_URI not found');
// // //     }

// // //     return uri;
// // //   }

// // //   getPort(): number {
// // //     return this.configService.get<number>('PORT') || 5000;
// // //   }
// // // }


// // import { Injectable } from '@nestjs/common';
// // import { ConfigService as NestConfigService } from '@nestjs/config';

// // @Injectable()
// // export class ConfigService {
// //   constructor(private configService: NestConfigService) {}

// //   getGeminiApiKey(): string {
// //     const key = this.configService.get<string>('GEMINI_API_KEY');

// //     if (!key) {
// //       throw new Error('GEMINI_API_KEY not found in environment variables');
// //     }

// //     return key;
// //   }

// //   // getMongoUri(): string {
// //   //   const uri = this.configService.get<string>('MONGODB_URI');

// //   //   if (!uri) {
// //   //     throw new Error('MONGODB_URI not found in environment variables');
// //   //   }

// //   //   return uri;
// //   // }

// //   getMongoUri(): string {
// //   const uri = this.configService.get<string>('MONGODB_URI');
// //   console.log("Mongo URI:", uri);
// //   return uri;
// // }
// //   getPort(): number {
// //     return this.configService.get<number>('PORT') || 5000;
// //   }

// //   getNodeEnv(): string {
// //     return this.configService.get<string>('NODE_ENV') || 'development';
// //   }

// //   isProduction(): boolean {
// //     return this.getNodeEnv() === 'production';
// //   }
// // }


// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ConfigService {

//   get(key: string): string | undefined {
//     return process.env[key];
//   }

//   getMongoUri(): string {
//     const uri = this.get('MONGODB_URI');
//     console.log("Mongo URI:", uri);
//     return uri || '';
//   }

//   getPort(): number {
//     return Number(this.get('PORT')) || 5000;
//   }

//   getNodeEnv(): string {
//     return this.get('NODE_ENV') || 'development';
//   }

//   isProduction(): boolean {
//     return this.getNodeEnv() === 'production';
//   }

// }


import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

  get(key: string): string | undefined {
    return process.env[key];
  }

  getMongoUri(): string {
    return this.get('MONGODB_URI=mongodb+srv://jaisgautam:Amit123@cluster0.m1k5sz6.mongodb.net/ai-sustainability') || '';
  }

  getGeminiApiKey(): string {
    return this.get('GEMINI_API_KEY=AIzaSyBd-nlYa3COWpXeYrKUA5wzg-TtO_luMOM') || '';
  }

  getPort(): number {
    return Number(this.get('5000')) || 5000;
  }

}