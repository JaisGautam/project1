export declare class AppController {
    getHello(): string;
    healthCheck(): {
        status: string;
        timestamp: string;
        environment: string;
        mongodb: string;
        gemini: string;
    };
}
