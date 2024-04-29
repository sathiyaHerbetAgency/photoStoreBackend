import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSON } from "./../../libs/apiGateway";
import { v4 as uuid } from "uuid";
import { dynamo } from "./../../libs/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const tableName = process.env.remindersTable;
    const { email, phoneNumber, reminder, reminderDate } = body;
    const validationError = validateInputs({
      email,
      phoneNumber,
      reminder,
      reminderDate
  });
    if (validationError) {
      return validationError;
    }
    const userId = email || phoneNumber;
    const data = {
      ...body,
      id: uuid(),
      TTL:reminderDate / 1000,
      pk: userId,
      sk: reminderDate,
    };
    await dynamo.write(data, tableName);
    return formatJSON({
      data: {
        message: `Reminder added successfully ${new Date(
          reminderDate
        ).toDateString()}`,
        id: data.id,
      },
    });
  } catch (error) {
    console.log("Error: " + error);
    return formatJSON({
      statusCode: 500,
      data: {
        message: error.message,
      },
    });
  }
};

const validateInputs = ({
  email,
  phoneNumber,
  reminder,
  reminderDate,
}: {
  email?: string;
  phoneNumber?: string;
  reminder: String;
  reminderDate: number;

  
}) => {

  if (!email && !phoneNumber) {
    return formatJSON({
      statusCode: 400,
      data: {
        message: `Email or Phone number is required ${body}`,
      },
    });
  }
  if (!reminder) {
    return formatJSON({
      statusCode: 400,
      data: {
        message: "Reminder is required",
      },
    });
  }
  if (!reminderDate) {
    return formatJSON({
      statusCode: 400,
      data: {
        message: "Reminder date is required",
      },
    });
  }
  return;
};
