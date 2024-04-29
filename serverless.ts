import type { AWS } from '@serverless/typescript';

import functions from './serverless/functions';
import dynamoResource from './serverless/dynamoResource';

const serverlessConfiguration: AWS = {
  service: 'remindersApp',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    profile: 'serverless-user',
    region:'ap-southeast-1',
    iamRoleStatements:[
      {
        Effect:'Allow',
        Action:'dynamodb:*',
        Resource:'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.remindersTable}',
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      remindersTable:"${self:custom.remindersTable}",
      // baseUrl: {
      //   'Fn::Join':[
      //     '',
      //     [
      //       'https://',
      //       { Ref: 'HttpApi' },
      //       '.execute-api.${self:provider.region}.amazonaws.com',
      //     ],
      //   ],
      // },
    },
  },
  // import the function via paths
functions,
resources: {
  Resources: {
    ...dynamoResource,
  },
},

  package: { individually: true },
  custom: {
    remindersTable: "${sls:stage}-reminders-table",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
