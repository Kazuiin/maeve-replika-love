echo converting all images to png

for %%i in ("*.jpg") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.jpeg") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.png") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.png") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.gif") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.tiff") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.avif") do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.exr) do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.webp) do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"

for %%i in ("*.dng) do "ffmpeg.exe" -n -i "%%i" -f image2 -c:v copy -q:v 1 "%%~ni.png"
