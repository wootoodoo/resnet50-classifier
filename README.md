This project involves a containerised resnet classifier that runs on AWS Lambda to perform classifications.

Communications with the backend are done using Websocket on AWS API gateway, and the classifier is triggered to run once a photo is uploaded onto S3.

There is a dynamoDB database too that is used to store the websocket connection ID to match it to the classification results from the classifier, so that it will be able to send the results back via Websocket to the frontend.
