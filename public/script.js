document.getElementById("cameraButton").addEventListener("click", function () {
    document.getElementById("mypic").click();
});

document.getElementById("mypic").addEventListener("change", function () {
    document.getElementById("refreshButton").style.display = "inline-block";
});

document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    const fileInput = document.getElementById("mypic");
    if (fileInput.files.length === 0) {
        alert("Please select an image first!");
        return;
    }

    formData.append("mypic", fileInput.files[0]);

    try {
        const response = await fetch("/api/submit-pic", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            alert(`Image uploaded successfully! Image ID: ${result.imageID}`);
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert("Upload failed. Try again.");
    }
});

// Manual form submission handler
document.querySelector(".login-part form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const vehicleNumber = document.getElementById("vehicle").value.trim();
    const violation = document.getElementById("violation").value;
    const fine = document.getElementById("fine").value;
    const fileInput = document.getElementById("mypic");
    
    if (!vehicleNumber) {
        alert("Please enter the vehicle number.");
        return;
    }

    if (violation === "") {
        alert("Please select a violation.");
        return;
    }

    if (fine === "") {
        alert("Please select an amount.");
        return;
    }

    const imageID = fileInput.files.length > 0 ? fileInput.files[0].name : null;

    const challanData = {
        vehicle_number: vehicleNumber,
        violation: violation,
        fine: fine,
        imageID: imageID
    };

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(challanData),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Challan submitted successfully!");
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert("Failed to submit challan. Try again.");
    }
});
let deferredPrompt;

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("✅ Service Worker Registered", reg))
      .catch(err => console.error("❌ Service Worker Registration Failed", err));
  });
}

// Ensure DOM is Loaded Before Accessing Elements
document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("install-button");

  if (!installBtn) return; // Exit if button doesn't exist

  // Hide install button if PWA is already installed
  if (window.matchMedia("(display-mode: standalone)").matches) {
    installBtn.style.display = "none";
  }

  // Handle Install Prompt
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    // Show Install Button after a delay (fix for some browsers)
    setTimeout(() => {
      installBtn.style.display = "block";
    }, 1000);
  });

  // Click Event for Install Button
  installBtn.addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("🎉 User installed the PWA");
        } else {
          console.log("❌ User dismissed the install prompt");
        }
        deferredPrompt = null;
      });
    }
  });

  // Hide Install Button After Installation
  window.addEventListener("appinstalled", () => {
    console.log("✅ PWA Installed Successfully");
    installBtn.style.display = "none";
  });
});
