export declare class ConfigService {
    get(key: string): string | undefined;
    getMongoUri(): string;
    getGeminiApiKey(): string;
    getPort(): number;
}
