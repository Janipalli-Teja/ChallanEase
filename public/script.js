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
            alert(`OCR Result: ${JSON.stringify(result.extractedText)}`);
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert("Upload failed. Try again.");
    }
});


