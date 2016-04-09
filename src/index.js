import '../vendor/aws-sdk.js';  // Contains only the S3 library

import {
  bucket,
  region,
  destURL
} from './constants';

import {
  accessKeyId,
  secretAccessKey
} from './credentials';

const configAWS = () => {
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
  });
};

const upload = (gif, name) => {
  const s3 = new AWS.S3();

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket,
      Key: name,
      Body: gif,
      ContentType: 'image/gif'
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Get the first img in the document and return it as a blob
const getGif = () => {
  const gif = document.querySelector('img');

  return new Promise((resolve) => {
    fetch(gif.src).then((response) => {
      response.blob().then((blob) => {
        resolve(blob);
      });
    });
  });
};

// Get the name the gif will be called on S3
const getName = () => {
  return prompt('Enter a filename (no ".gif"):');
};

(() => {
  configAWS();

  let filename = getName();

  if (filename !== null) {
    filename += '.gif';

    getGif().then((blob) => {
      upload(blob, filename).then(() => {
        location.href = `${destURL}${filename}`;
      }).catch((err) => {
        console.warn(`Error!: ${err}`);
      });
    });
  }
})();
