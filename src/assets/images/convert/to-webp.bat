echo converting all images to WebP

for %%i in ("*.jpg", "*.jpeg", "*.png", "*.gif", "*.tiff", "*.avif", "*.exr", "*.webp", "*.dng") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "output/%%~ni.webp"