aws --profile bjacobel configure set preview.cloudfront true
aws --profile bjacobel s3 cp dist/uploader.js s3://gifs.bjacobel.com/uploader.js
#aws --profile bjacobel cloudfront create-invalidation --distribution-id EH49LPYEWBIUB --paths /uploader.js
echo "javascript:$(cat dist/bookmarklet.js | perl -MURI::Escape -ne 'chomp;print uri_escape($_),"\n"')" | pbcopy
