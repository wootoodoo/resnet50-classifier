const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    console.log(event);
    const connectionid = event.requestContext.connectionId;

    addConnectionId(connectionid).then(
        () => {    
            callback(null, 
            {        
                statusCode: 200
            })
        }
        )
}

function addConnectionId(connectionid) { 
    return dynamo.put({        
        TableName: 'resnet-inference',    
        Item: { 
            connectionId : connectionid,
            s3FileName : 'temporary'
        }
        }).promise();
    
    }