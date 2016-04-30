##gifs-web-uploader

Bookmarklet to upload the image currently displayed to an S3 bucket.

### requirements
Because of the use of `createImageBitmap()`, only works on Chrome >= 50 and Firefox >= 42.

Also requires an AWS account and gitignored file in `/src` named `credentials.js` with the following structure:

```
export const accessKeyId = '<your aws access key>';
export const secretAccessKey = '<your aws secret key>';
```

### motivation
Being used with [gifs.bjacobel.com](https://gifs.bjacobel.com) to create a massive, searchable gif library.

### build
```
npm run build
```
Then paste the contents of your clipboard into the URL field of a bookmark.
