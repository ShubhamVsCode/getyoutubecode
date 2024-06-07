chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureScreenshot") {
    console.log("Getting screenshot");

    const video = document.querySelector("video");
    if (video) {
      console.log("video", video);
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      console.log("dataUrl", dataUrl);
      sendResponse({ screenshot: dataUrl });
    } else {
      sendResponse({ error: "No video element found" });
    }
  }
  return true;
});
