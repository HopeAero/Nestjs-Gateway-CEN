import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });

import * as Joi from 'joi';

interface EnvVars {
    PORT: number;
    RABBITMQ_DEFAULT_USER: string;	
    RABBITMQ_DEFAULT_PASS: string;
    RABBITMQ_HOST: string;
    RABBITMQ_PORT: string;
}

const envVarsSchema = Joi.object({
    PORT: Joi.number().required(),
    CHAT_MICROSERVICE_HOST: Joi.string().required(),
    CHAT_MICROSERVICE_PORT: Joi.string().required(),
    RABBITMQ_DEFAULT_USER: Joi.string().required(),
    RABBITMQ_DEFAULT_PASS: Joi.string().required(),
    RABBITMQ_HOST: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env, { stripUnknown: true });

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs : EnvVars = {
    PORT: envVars.PORT,
    RABBITMQ_DEFAULT_USER: process.env.RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASS: process.env.RABBITMQ_DEFAULT_PASS,
    RABBITMQ_HOST: process.env.RABBITMQ_HOST,
    RABBITMQ_PORT: process.env.RABBITMQ_PORT,
}