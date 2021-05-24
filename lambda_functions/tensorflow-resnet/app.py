import json
import boto3
import numpy as np
import PIL.Image as Image

import tensorflow as tf
import tensorflow_hub as hub

IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224

IMAGE_SHAPE = (IMAGE_WIDTH, IMAGE_HEIGHT)
model = tf.keras.Sequential([hub.KerasLayer("model/")])
model.build([None, IMAGE_WIDTH, IMAGE_HEIGHT, 3])
imagenet_labels= np.array(open('model/ImageNetLabels.txt').read().splitlines())

s3 = boto3.resource('s3')
dynamodb = boto3.resource('dynamodb')
apig_management_client = boto3.client('apigatewaymanagementapi', endpoint_url='https://6jekkgz6dd.execute-api.ap-southeast-1.amazonaws.com/dev')

def lambda_handler(event, context):
  bucket_name = event['Records'][0]['s3']['bucket']['name']
  key = event['Records'][0]['s3']['object']['key']

  img = readImageFromBucket(key, bucket_name).resize(IMAGE_SHAPE)
  img = np.array(img)/255.0

  prediction = model.predict(img[np.newaxis, ...])
	
  # max_confidence_index = np.argmax(prediction[0], axis=-1)
  top5_confidence_index = np.argsort(-prediction[0], axis=-1)[:5]

  message = "{\"s3FileName\": \"" + key + "\""
  i = 1

  for index in top5_confidence_index:
    prediction_confidence = prediction[0][index]
    predicted_class = imagenet_labels[index]
    print('ImageName: {0}, Prediction: {1}, Prediction confidence: {2}'.format(key, predicted_class, prediction_confidence))
    message += ", \"prediction_" + str(i) + "\": \"" + predicted_class + "\", \"predictionConfidence_" + str(i) + "\": \"" + str(prediction_confidence) + "\""
    i += 1
  message += "}"

  
  # message = "{\"s3FileName\": \"" + key + "\", \"prediction\": \'" + predicted_class + "\", \"predictionConfidence\": \"" + str(prediction_confidence) + "\"}"

  table = dynamodb.Table('resnet-inference')
  response = table.get_item(Key={'s3FileName': key})
  connection_id = response['Item']['connectionId']
  send_response = apig_management_client.post_to_connection(Data=message, ConnectionId=connection_id)
  return message

def readImageFromBucket(key, bucket_name):
  bucket = s3.Bucket(bucket_name)
  object = bucket.Object(key)
  response = object.get()
  return Image.open(response['Body'])
