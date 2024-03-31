import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
    if (process.env.NODE_ENV !== 'production') {
        const options = new DocumentBuilder()
            .setTitle('Web Service API')
            .setVersion('1.0.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup('api', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            },
        });
    }
};