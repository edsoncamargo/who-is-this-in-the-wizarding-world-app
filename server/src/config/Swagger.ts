export function swaggerConfig() {
    return {
        routePrefix: '/documentation',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Wrapper API',
                description: 'Building a wrapper api',
                version: '1.0.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost:3000',
            schemes: [
                'http',
                'https'
            ],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                ApiToken: {
                    description: 'Authorization header token, sample: "Bearer #TOKEN#"',
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                },
                Oauth2Token: {
                    description: 'OAUTH2',
                    type: 'oauth2',
                    flow: 'accessCode',
                    authorizationUrl: 'https://example.com/oauth/authorize',
                    tokenUrl: 'https://example.com/oauth/token',
                    scopes: {
                        read: 'Grants read access',
                        foo: 'Grants foao scope'
                    }
                }
            }
        }
    }
}