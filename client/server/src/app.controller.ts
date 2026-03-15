// import { Controller, Get } from '@nestjs/common';

// @Controller()
// export class AppController {
//   @Get()
//   getRoot() {
//     return {
//       message: 'AI Sustainability API',
//       version: '1.0.0',
//       endpoints: {
//         category: {
//           generate: 'POST /category/generate',
//           recent: 'GET /category/recent'
//         },
//         proposal: {
//           generate: 'POST /proposal/generate',
//           recent: 'GET /proposal/recent',
//           byId: 'GET /proposal/:id'
//         }
//       },
//       docs: 'API documentation coming soon...',
//       timestamp: new Date().toISOString()
//     };
//   }

//   @Get('health')
//   getHealth() {
//     return {
//       status: 'OK',
//       timestamp: new Date().toISOString(),
//       uptime: process.uptime(),
//       environment: process.env.NODE_ENV || 'development'
//     };
//   }
// }


import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'AI Sustainability API is running!';
  }
  
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      mongodb: process.env.MONGODB_URI ? 'configured' : 'not configured',
      gemini: process.env.GEMINI_API_KEY ? 'configured' : 'not configured'
    };
  }
}