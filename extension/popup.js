document.getElementById("capture-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "captureScreenshot" },
      (response) => {
        if (response && response.screenshot) {
          const screenshotImg = document.getElementById("screenshot");
          screenshotImg.src = response.screenshot;
          screenshotImg.style.display = "block";

          // Prepare the screenshot as a Blob for FormData
          const screenshotBlob = dataURItoBlob(response.screenshot);

          // Create FormData and append the screenshot file
          const formData = new FormData();
          formData.append("screenshot", screenshotBlob, "screenshot.png");

          // Send the screenshot to the backend
          fetch("http://localhost:3000/api/screenshot", {
            method: "POST",
            body: formData, // Send as FormData
            // No need to set Content-Type; it will be set automatically by the FormData
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              // show this in popup.html and copy it to clipboard
              document.getElementById("code").value = data.code;
              //   document.getElementById("code").textContent = data.code;
              document.getElementById("code").select();
              document.execCommand("copy");
              alert("Copied to clipboard");
            });
        } else {
          console.error(response || "Failed to capture screenshot");
        }
      },
    );
  });
});

// Helper function to convert dataURI to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
