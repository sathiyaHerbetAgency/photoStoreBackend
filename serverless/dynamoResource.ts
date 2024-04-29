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
      }
    //   Enabled: true,
    },
  },
};

export default dynamoResource;
