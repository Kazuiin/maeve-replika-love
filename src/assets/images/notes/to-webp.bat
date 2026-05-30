echo converting all images to WebP

for %%i in ("*.jpg") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.jpeg") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.jpeg") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.png") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.gif") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.tiff") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.avif") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.exr) do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.webp) do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

for %%i in ("*.dng") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.webp"

