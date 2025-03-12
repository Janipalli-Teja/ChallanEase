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
