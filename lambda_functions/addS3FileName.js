const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {  
    console.log(event.body);
    const connectionid = event.requestContext.connectionId;
    const fileName = JSON.parse(event.body).message;
    deleteConnectionId(connectionid).then(
    addConnectionId(connectionid, fileName).then(
        () => {    
            callback(null, 
            {        
                statusCode: 200
            })
        }
        )
    );
    
function deleteConnectionId(connectionid) {
    return dynamo.delete(
        {
            TableName: 'resnet-inference',    
            Key: { s3FileName : connectionid }
        }).promise();
}
    
function addConnectionId(connectionid, fileName) { 
    return dynamo.put({        
        TableName: 'resnet-inference',    
        Item: { 
            connectionId : connectionid,
            s3FileName : fileName 
        }
        }).promise();
    
    }
}