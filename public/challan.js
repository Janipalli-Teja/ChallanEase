document.addEventListener("DOMContentLoaded", async function () {
    const challanList = document.getElementById("challans");

    if (!challanList) {
        console.error("Error: Challan list container not found in HTML.");
        return;
    }

    try {
        const response = await fetch("/api/challan");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const challans = await response.json();
        if (!Array.isArray(challans)) throw new Error("Invalid data format: Expected an array.");

        challans.forEach(challan => {
            const li = document.createElement("li");

            li.innerHTML = `
                <strong> Vehicle:</strong> ${challan.vehicle_number} <br>
                <strong>Violation:</strong> ${challan.violation} <br>
                <strong>Fine:</strong> ₹${challan.fine} <br>
                ${challan.imageID ? `<img src="/uploads/${challan.imageID}" width="100" onerror="this.src='">` : ""}
                <hr>
            `;

            challanList.appendChild(li);
        });

    } catch (error) {
        console.error("Failed to fetch challans:", error);
    }
});
