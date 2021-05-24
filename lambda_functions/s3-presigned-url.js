const AWS = require('aws-sdk');
const s3 = new AWS.S3({signatureVersion: 'v4'});

exports.handler = async (event) => {
    let bucketName = 'tensorflow-images-for-inference-jonathan';
    console.log(event);
    let body = JSON.parse(event.body)
    let objectKey = body.objectKey;
    var params = {Bucket: bucketName, Key: objectKey, Expires: 600};
    var putUrl = s3.getSignedUrl('putObject', params);
    var getUrl = s3.getSignedUrl('getObject', params);
    
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({
            putUrl: putUrl,
            getUrl: getUrl
        })
    };
    return response;
};