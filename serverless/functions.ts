import type { AWS } from '@serverless/typescript';


const functions:AWS['functions'] = {
    setReminder1: {
        handler: 'src/functions/setReminder1/index.handler',
        events: [
            {
                httpApi: {
                    method: 'post',
                    path: '/',
                
                },
            },
        ],
    },
    sendReminder:{
        handler:'src/functions/sendReminder/index.handler',
        events: [
            {
                stream:{
                    type:'dynamodb',
                    arn:{
                        'Fn::GetAtt':[
                            'remindersTable',
                            'StreamArn'
                        ],
                    },
                    filterPatterns: [{eventName: ['REMOVE']}],
                }
            }
        ],
        //@ts-expect-error
        iamRoleStatements:[
            {
              Effect:'Allow',
              Action:[
                'ses:sendEmail',
                'sns:Publish'
            ],
              Resource:'*',
            }
        ],

    }
}

export default functions;