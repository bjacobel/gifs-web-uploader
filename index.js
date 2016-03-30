import 'aws-sdk/dist/aws-sdk';
import {
  accessKeyId,
  bucket,
  region,
  secretAccessKey
} from '../constants';

const s3 = new window.AWS.S3();

const configAWS = () => {
  window.AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
  });
};

const upload = (url, name) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      const params = { Bucket: bucket, Key: name, Body: response.body };

      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
};

const getURL = () => {
  return window.location.pathname;
};

const getName = () => {
  return window.prompt('Enter a name for this gif:');
};

(() => {
  configAWS();

  upload(getURL(), getName()).then(() => {
    console.log('Success!');
  }).catch((err) => {
    console.warn('Error!: ', err);
  });
})();
