echo "javascript:$(cat dist/main.js | perl -MURI::Escape -ne 'chomp;print uri_escape($_),"\n"')" | pbcopy
