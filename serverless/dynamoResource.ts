import type { AWS } from "@serverless/typescript";

const dynamoResource: AWS["resources"]["Resources"] = {
  remindersTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:custom.remindersTable}",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
        {
          AttributeName: "pk",
          AttributeType: "S",
        },
        {
          AttributeName: "sk",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      TimeToLiveSpecification: {
        AttributeName : "TTL",
        Enabled : true
      },
      StreamSpecification: {
      StreamViewType: "OLD_IMAGE",
      },
      GlobalSecondaryIndexes:[
        {
          IndexName: "index1",
          KeySchema: [
            {
              AttributeName: "pk",
              KeyType: "HASH",
            },
            {
              AttributeName: "sk",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
          // ProvisionedThroughput: {
          //   ReadCapacityUnits: 1,
          //   WriteCapacityUnits: 1,
          // },
        }
      ]
    },
  },
};

export default dynamoResource;
