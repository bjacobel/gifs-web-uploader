import 'blueimp-canvas-to-blob';
import hmacsha1 from 'hmacsha1'
import {
  bucket,
  destURL
} from './constants';
import {
  accessKeyId,
  secretAccessKey
} from './credentials';

const upload = (gif, name) => {
  const date = new Date();

  const stringToSign =
    'PUT\n' +
    '\n' +
    'image/gif\n' +
    `${date}\n` +
    'x-amz-acl:public-read\n' +
    `/${bucket}/${name}`;

  const signature = btoa(hmacsha1(
    secretAccessKey,
    unescape(encodeURIComponent(stringToSign))
  ));

  const headers = new Headers();
  headers.append('Authorization', `AWS ${accessKeyId}:${signature}`);
  headers.append('Content-Length', gif.size);
  headers.append('Content-Type', 'image/gif');
  headers.append('Date', date);
  headers.append('Expect', '100-continue');
  headers.append('Host', `${bucket}.s3.amazonaws.com`);
  headers.append('x-amz-acl', 'public-read');

  return fetch(
    `https://s3.amazonaws.com/${bucket}/${name}`,
    {
      method: 'PUT',
      body: gif,
      headers
    }
  );
};

// Get the first img in the document and return it as a blob
const getGif = () => {
  const gif = document.querySelector('img');
  const canvas = document.createElement('canvas');

  canvas.width = gif.width;
  canvas.height = gif.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(gif, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  });
};

// Get the name the gif will be called on S3
const getName = () => {
  return 'oops';
  // return prompt('Enter a filename (no ".gif"):');
};

window.onload = () => {
  const filename = `${getName()}.gif`;

  getGif().then((gif) => {
    upload(gif, filename).then(() => {
      // location.href = `${destURL}${filename}`;
    }).catch((err) => {
      console.warn(`Error!: ${err}`);
    });
  });
};
