interface Config {
    apiUrl: string;
    videoUrl: string;
    githubLoginUrl: string;
    webSocketUrl: string;
  }

class ConfigService {
    private static instance: ConfigService;
    private config: Config | null = null;
    private initialized = false;

    private constructor() {}

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }

        return ConfigService.instance;
    }

    public async init(): Promise<void> {
        if (this.initialized) return;

        const getBasePath = () => {
            if (import.meta.env?.BASE_URL) {
              return import.meta.env.BASE_URL;
            }
            return window.location.origin;
          };

        try {
            const response = await fetch(getBasePath() + "/config.json");
            this.config = await response.json();
            this.initialized = true;
        } catch (error) {
            console.error("Failed to load config.json", error);
            throw error;
        }
    }

    public getConfig(): Config {
        if (!this.config) {
            throw new Error("Config not initialized");
        }
        return this.config;
    }
}

const configService = ConfigService.getInstance();

export const getApiUrl = () => configService.getConfig().apiUrl;
export const getVideoUrl = () => configService.getConfig().videoUrl;
export const getGithubLoginUrl = () => configService.getConfig().githubLoginUrl;
export const getWebSocketUrl = () => configService.getConfig().webSocketUrl;

export default configService;