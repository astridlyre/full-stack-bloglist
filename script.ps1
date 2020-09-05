Remove-Item -r build
Set-Location ../full-stack-open/part4/bloglist-ui
npm run build --prod
Copy-Item -r build ../../../full-stack-bloglist
Set-Location ../../../full-stack-bloglist