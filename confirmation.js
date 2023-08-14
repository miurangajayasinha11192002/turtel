document.addEventListener('DOMContentLoaded', function() {
    
    const summaryTableData = localStorage.getItem("summaryTable");

    if (summaryTableData) {
        
        const table = document.querySelector(".table");
        table.innerHTML = summaryTableData;
    } else {
        
        const table = document.querySelector(".table");
        table.innerHTML = "<tr><td colspan='2'>No summary table data available.</td></tr>";
    }

    
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
        
        document.getElementById("use-name").textContent = userDetails.fullName;
        document.getElementById("use-mobile").textContent = userDetails.mobileNumber;
        document.getElementById("use-email").textContent = userDetails.email;
        document.getElementById("use-gender").textContent = userDetails.gender;
    } else {
        console.log("User details not found in local storage.");
    }
});