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
  
    
    const paymentForm = document.getElementById('paymentform');
    const payButton = document.getElementById('payButton');
    const totalPayables = document.getElementById('totalPayables');
  
    const requiredInputs = paymentForm.querySelectorAll('input[required], select[required]');
  
    function togglePayButton() {
        const allFilled = Array.from(requiredInputs).every(input => input.value.trim() !== '');
        payButton.disabled = !allFilled;
    }
  
    
    requiredInputs.forEach(input => {
        input.addEventListener('input', togglePayButton);
    });
  
    
    const totalPayablesValue = totalPayables.textContent;
    payButton.textContent = `PAY ${totalPayablesValue}`;
  
    
    payButton.addEventListener("click", function() {
        
        const summaryTableData = localStorage.getItem("summaryTable");
  
        
        window.location.href = `confirmation.html?summaryTable=${encodeURIComponent(summaryTableData)}`;
    });
  });