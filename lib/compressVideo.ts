/**
 * Compress video using canvas and MediaRecorder API
 * Reduces video quality to save storage space
 */
export async function compressVideo(file: File, maxSizeMB: number = 10): Promise<File> {
  // If file is already small enough, return as-is
  if (file.size <= maxSizeMB * 1024 * 1024) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      // Calculate target dimensions (max 720p)
      let width = video.videoWidth;
      let height = video.videoHeight;
      const maxDim = 720;

      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;

      // Target bitrate based on desired file size
      const duration = video.duration;
      const targetBitsPerSecond = Math.floor((maxSizeMB * 8 * 1024 * 1024) / duration * 0.8);
      const bitrate = Math.min(targetBitsPerSecond, 1500000); // Max 1.5 Mbps

      const stream = canvas.captureStream(24); // 24 fps
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8',
        videoBitsPerSecond: bitrate,
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webm'), {
          type: 'video/webm',
        });
        resolve(compressedFile);
      };

      mediaRecorder.onerror = () => reject(new Error('Compression failed'));

      video.onplay = () => {
        mediaRecorder.start();

        const drawFrame = () => {
          if (video.ended || video.paused) {
            mediaRecorder.stop();
            return;
          }
          ctx.drawImage(video, 0, 0, width, height);
          requestAnimationFrame(drawFrame);
        };
        drawFrame();
      };

      video.onended = () => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      };

      video.play();
    };

    video.onerror = () => reject(new Error('Failed to load video'));
    video.src = URL.createObjectURL(file);
  });
}
