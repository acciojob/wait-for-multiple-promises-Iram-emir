document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event fired.");

    // Function to create a promise that resolves after a random time between 1 and 3 seconds
    function createPromise() {
        const randomTime = Math.floor(Math.random() * 2000) + 1000; // Random time between 1000ms and 3000ms
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(randomTime / 1000); // Resolving with time in seconds
            }, randomTime);
        });
    }

    console.log("Creating promises...");
    // Array to store promises
    const promises = [];

    // Creating 3 promises
    for (let i = 0; i < 3; i++) {
        promises.push(createPromise());
    }

    console.log("Promises created:", promises.length);

    // Adding loading text
    const loadingRow = document.createElement("tr");
    loadingRow.setAttribute("id", "loading"); // Add the ID "loading" to the loading row
    const loadingCell = document.createElement("td");
    loadingCell.setAttribute("colspan", "2");
    loadingCell.textContent = "Loading...";
    loadingRow.appendChild(loadingCell);
    document.getElementById("output").appendChild(loadingRow);

    console.log("Loading element added to DOM.");

    // Using Promise.all to wait for all promises to resolve
    Promise.all(promises)
        .then(results => {
            console.log("All promises resolved:", results);
            // Removing loading text
            document.getElementById("output").removeChild(loadingRow);

            // Populating the table with resolved values
            results.forEach((time, index) => {
                const row = document.createElement("tr");
                const promiseCell = document.createElement("td");
                promiseCell.textContent = `Promise ${index + 1}`;
                const timeCell = document.createElement("td");
                timeCell.textContent = time.toFixed(3);
                row.appendChild(promiseCell);
                row.appendChild(timeCell);
                document.getElementById("output").appendChild(row);
            });

            // Calculating and adding total time
            const totalTime = results.reduce((acc, curr) => acc + curr, 0);
            const totalRow = document.createElement("tr");
            const totalCellLabel = document.createElement("td");
            totalCellLabel.textContent = "Total";
            const totalCellValue = document.createElement("td");
            totalCellValue.textContent = totalTime.toFixed(3);
            totalRow.appendChild(totalCellLabel);
            totalRow.appendChild(totalCellValue);
            document.getElementById("output").appendChild(totalRow);
        });
});
