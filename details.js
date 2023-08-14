document.addEventListener('DOMContentLoaded', function() {
    
    const displaySummaryTableFromLocalStorage = () => {
        
        const summaryTableData = localStorage.getItem("summaryTable");
  
        if (summaryTableData) {
            
            const detailsSummaryTable = document.querySelector(".det-summary-t");
            detailsSummaryTable.innerHTML = summaryTableData;
        }
    };
  
    
    const handleFormSubmission = (event) => {
      event.preventDefault(); 
  
      
      const fullName = document.getElementById("firstname").value;
      const mobileNumber = document.getElementById("countrynum").value + document.getElementById("telephone").value;
      const email = document.getElementById("email").value;
      const gender = document.getElementById("Gender").value;
  
      
      document.getElementById("use-name").textContent = fullName;
      document.getElementById("use-mobile").textContent = mobileNumber;
      document.getElementById("use-email").textContent = email;
      document.getElementById("use-gender").textContent = gender;
  
      const userDetails = {
          fullName,
          mobileNumber,
          email,
          gender
      };
      console.log("User details saved:", userDetails);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
  
      
      const detailsSummaryTable = document.querySelector(".det-summary-t").innerHTML;
      localStorage.setItem("summaryTable", detailsSummaryTable);
  
      
      window.location.href = "payment.html";
  
      
      alert("User data and summary table data are saved to local storage.");
  };
  
    
    const detailsForm = document.querySelector("form[action='details-form']");
    detailsForm.addEventListener("submit", handleFormSubmission);
  
    
    displaySummaryTableFromLocalStorage();
  });