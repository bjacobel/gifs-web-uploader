##gifs-web-uploader

Bookmarklet to upload the image currently displayed to an S3 bucket.

### requirements
Create a .gitignored file in `/src` named `credentials.js` with the following structure:

```
export const accessKeyId = '<your aws access key>';
export const secretAccessKey = '<your aws secret key>';
```

The S3 bucket specified in `src/constants.js` must be configured with the following CORS policy:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
        <ExposeHeader>ETag</ExposeHeader>
    </CORSRule>
</CORSConfiguration>
```

### build
```
npm run build
```
Then paste the contents of your clipboard into the URL field of a bookmark.

### test
```
npm start
```
will open a page on `localhost:8080` containing a test gif that will automatically activate the bookmarklet code and attempt an S3 upload.

### motivation
Used with [gifs.bjacobel.com](https://gifs.bjacobel.com) to create a massive, searchable gif library.
