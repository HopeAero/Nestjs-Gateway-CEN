import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });

import * as Joi from 'joi';

interface EnvVars {
    PORT: number;
    CHAT_MICROSERVICE_HOST: string;
    CHAT_MICROSERVICE_PORT: string;
}

const envVarsSchema = Joi.object({
    PORT: Joi.number().required(),
    CHAT_MICROSERVICE_HOST: Joi.string().required(),
    CHAT_MICROSERVICE_PORT: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env, { stripUnknown: true });

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs : EnvVars = {
    PORT: envVars.PORT,
    CHAT_MICROSERVICE_HOST: envVars.CHAT_MICROSERVICE_HOST,
    CHAT_MICROSERVICE_PORT: envVars.CHAT_MICROSERVICE_PORT,
}