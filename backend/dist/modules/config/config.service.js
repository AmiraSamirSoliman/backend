"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const Joi = require("@hapi/joi");
const product_entity_1 = require("../../modules/domain/orders/entities/product.entity");
const order_entity_1 = require("../../modules/domain/orders/entities/order.entity");
const employee_entity_1 = require("../domain/employees/entities/employee.entity");
class ConfigService {
    constructor() {
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            TYPEORM_CONNECTION: Joi.string().default('postgres'),
            VERSION: Joi.string().default('local'),
            NODE_ENV: Joi.string()
                .valid('local', 'development', 'production', 'test', 'provision')
                .default('local'),
            BACKEND_PORT: Joi.number().default(3030),
            LOGGLY_SUBDOMAIN: Joi.string(),
            LOGGLY_TOKEN: Joi.string(),
            TYPEORM_ENTITIES: Joi.string().required(),
            TYPEORM_USERNAME: Joi.string().required(),
            TYPEORM_PASSWORD: Joi.string().required(),
            TYPEORM_DATABASE: Joi.string().required(),
            TYPEORM_HOST: Joi.string().required(),
            TYPEORM_PORT: Joi.number()
                .integer()
                .default(5432),
            TYPEORM_MIGRATIONS: Joi.string(),
            CORS_WHITELIST: Joi.string().default(''),
            TYPEORM_LOGGING: Joi.string().default('false'),
        }).unknown();
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get about() {
        return {
            version: process.env.npm_package_version,
            environment: this.envConfig.NODE_ENV,
        };
    }
    get NODE_ENV() {
        return this.envConfig.NODE_ENV;
    }
    get PORT() {
        return this.envConfig.BACKEND_PORT;
    }
    get LOGGLY_SUBDOMAIN() {
        return this.envConfig.LOGGLY_SUBDOMAIN;
    }
    get LOGGLY_TOKEN() {
        return this.envConfig.LOGGLY_TOKEN;
    }
    get CORS_WHITELIST() {
        if (!this.envConfig.CORS_WHITELIST) {
            return [];
        }
        return this.envConfig.CORS_WHITELIST.split(',');
    }
    get TypeOrmDatabase() {
        return {
            type: 'postgres',
            host: 'postgres.cf3lrno7mqrm.us-east-2.rds.amazonaws.com',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [product_entity_1.Product, order_entity_1.Order, employee_entity_1.Employee],
            logging: this.envConfig.TYPEORM_LOGGING === 'true',
            extra: { max: 4, min: 1 },
            synchronize: false,
        };
    }
    get AUTH0_DOMAIN() {
        return this.envConfig.AUTH0_DOMAIN;
    }
    get AUTH0_AUDIENCE() {
        return this.envConfig.AUTH0_AUDIENCE;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map