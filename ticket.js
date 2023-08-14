const currentDate = document.querySelector(".current-date");
dayTag = document.querySelector(".day");
prevNextIcon = document.querySelectorAll(".icons span")
const durationSelect = document.getElementById("sele-duration");
const pricingTable = {
    "Foreigner Adult": { normal: 10, peak: 13 },
    "Foreigner Child": { normal: 5, peak: 8 },
    "SL Adult": { normal: 4, peak: 6 },
    "SL Child": { normal: 2, peak: 3 },
    Infants: { normal: 0, peak: 0 }, 
  };

let date = new Date();
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalender = () =>{
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                      && currYear === new Date().getFullYear() ? "active" : "";  
        liTag += `<li class="${isToday}">${i}</li>`;
        
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`
    dayTag.innerHTML = liTag;

    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            currMonth = icon.id === "back" ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth);
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else{
                date = new Date();
            }
            renderCalender();
        })
    })

    const dateCells = document.querySelectorAll(".day li");
    dateCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            

            
            const selectedDate = cell.innerText;

            
            document.getElementById("selected-da").innerText = `${months[currMonth]} ${selectedDate}, ${currYear}`;
            
        });
    })

    durationSelect.addEventListener("change", () => {
        const selectedOptions = Array.from(durationSelect.selectedOptions);
        const selectedTimes = selectedOptions.map((option) => option.text);
        document.getElementById("selected-ti").innerText = selectedTimes.join(", ");
    });


    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("input", updateSummaryTable);
};

const updateSummaryTable = () => {
  
  const slAdultsInput = document.querySelector('.guest-sele p:contains("SL Adults") + input');
  const slChildInput = document.querySelector('.guest-sele p:contains("SL Child") + input');
  const foreignAdultsInput = document.querySelector('.guest-sele p:contains("Foreign Adults") + input');
  const foreignChildInput = document.querySelector('.guest-sele p:contains("Foreign Child") + input');
  const infantsInput = document.querySelector('.guest-sele p:contains("Infants") + input');

  
  const selectedOptions = Array.from(durationSelect.selectedOptions);
  const selectedTimes = selectedOptions.map((option) => option.text);

  
  const slAdultsPrice = 4; 
  const slChildPrice = 2; 
  const foreignAdultsPrice = 10; 
  const foreignChildPrice = 5; 
  const totalSLAdults = slAdultsInput.value * slAdultsPrice;
  const totalSLChild = slChildInput.value * slChildPrice;
  const totalForeignAdults = foreignAdultsInput.value * foreignAdultsPrice;
  const totalForeignChild = foreignChildInput.value * foreignChildPrice;
  const totalInfants = 0; 

  const totalPayables = totalSLAdults + totalSLChild + totalForeignAdults + totalForeignChild + totalInfants;

  // Update the content of the summary table
  document.getElementById("selected-da").innerText = "Selected Date"; 
  document.getElementById("selected-ti").innerText = selectedTimes.join(", ");
  document.querySelector(".hide:nth-child(1) td:nth-child(2)").innerText = `$${totalSLAdults}`;
  document.querySelector(".hide:nth-child(2) td:nth-child(2)").innerText = `$${totalSLChild}`;
  document.querySelector("tr:nth-child(3) td:nth-child(2)").innerText = `$${totalForeignAdults}`;
  document.querySelector(".hide:nth-child(4) td:nth-child(2)").innerText = `$${totalForeignChild}`;
  document.querySelector(".hide:nth-child(5) td:nth-child(2)").innerText = `$${totalInfants}`;
  document.querySelector("tfoot tr td:nth-child(2)").innerText = `$${totalPayables}`;
}

renderCalender();



document.addEventListener('DOMContentLoaded', function() {

  const ticketTotals = {
      'SL Adult': 0,
      'SL Child': 0,
      'Foreign Adult': 0,
      'Foreign Child': 0,
      'Infant': 0
  };

  // Function to update a summary row
  function updateSummaryRow(input, row) {
      const enteredValue = parseInt(input.value);
      const ticketTypeCell = row.querySelector('td:first-child');
      const ticketType = ticketTypeCell.getAttribute('data-ticket-type');
      const normalPrice = parseFloat(row.getAttribute('data-normal-price'));
      const peakPrice = parseFloat(row.getAttribute('data-peak-price'));

      let totalPrice;
      if (ticketType === 'Infant') {
          totalPrice = 0; 
      } else {
          totalPrice = enteredValue * (isPeakHour() ? peakPrice : normalPrice);
      }

      row.querySelector('td:last-child').textContent = totalPrice > 0 ? '$' + totalPrice.toFixed(2) : 'FREE';
      ticketTotals[ticketType] = totalPrice;

      const totalPayablesCell = document.querySelector('tfoot td:last-child');
      const totalPayables = Object.values(ticketTotals).reduce((acc, curr) => acc + curr, 0);
      totalPayablesCell.textContent = '$' + totalPayables.toFixed(2);
      
  
      if (ticketType === 'Infant') {
          row.querySelector('td:last-child').textContent = 'FREE';
      } else {
          const totalPrice = enteredValue * (isPeakHour() ? peakPrice : normalPrice);
          row.querySelector('td:last-child').textContent = '$' + totalPrice.toFixed(2);
      }

      if (ticketType.toLowerCase().includes('child')) {
          if (enteredValue > 1) {
              ticketTypeCell.textContent = enteredValue + ' ' + ticketType + 'ren';
          } else {
              ticketTypeCell.textContent = enteredValue + ' ' + ticketType;
          }
      } else {
          if (enteredValue > 1) {
              ticketTypeCell.textContent = enteredValue + ' ' + ticketType + 's';
          } else {
              ticketTypeCell.textContent = enteredValue + ' ' + ticketType;
          }
      }

      if (enteredValue > 0) {
          row.classList.remove('hide');
      } else {
          row.classList.add('hide');
      }
  }

  function initializeSummaryRow(inputId, rowId, ticketType) {
      const input = document.getElementById(inputId);
      const row = document.getElementById(rowId);
      input.addEventListener('input', function() {
          updateSummaryRow(input, row);
      });
      row.querySelector('td:first-child').setAttribute('data-ticket-type', ticketType);
  }

  function isPeakHour() {
      const selectedDuration = document.getElementById('sele-duration').value;
      return selectedDuration.includes('Peak');
  }

  // SL Adults
  initializeSummaryRow('sl-adults-input', 'sl-adults-row', 'SL Adult');
  document.getElementById('sl-adults-row').setAttribute('data-normal-price', '4');
  document.getElementById('sl-adults-row').setAttribute('data-peak-price', '6');

  // SL Child
  initializeSummaryRow('sl-child-input', 'sl-child-row', 'SL Child');
  document.getElementById('sl-child-row').setAttribute('data-normal-price', '2');
  document.getElementById('sl-child-row').setAttribute('data-peak-price', '3');

  // Foreign Adults
  initializeSummaryRow('foreign-adults-input', 'foreign-adults-row', 'Foreign Adult');
  document.getElementById('foreign-adults-row').setAttribute('data-normal-price', '10');
  document.getElementById('foreign-adults-row').setAttribute('data-peak-price', '13');

  // Foreign Child
  initializeSummaryRow('foreign-child-input', 'foreign-child-row', 'Foreign Child');
  document.getElementById('foreign-child-row').setAttribute('data-normal-price', '5');
  document.getElementById('foreign-child-row').setAttribute('data-peak-price', '8');

  // Infants
  initializeSummaryRow('infant-input', 'infant-row', 'Infant');
  document.getElementById('infant-row').setAttribute('data-normal-price', 'FREE');
  document.getElementById('infant-row').setAttribute('data-peak-price', 'FREE');

  // Function to update the summary table and save to local storage
  const updateSummaryTable = () => {
    

      // Get the content of the summary table
      const summaryTable = document.querySelector(".summary-t").innerHTML;

      // Save the summary table data to local storage
      localStorage.setItem("summaryTable", summaryTable);

      // Show a confirmation message or perform any other action after saving to local storage
      alert("Summary table data saved to local storage!");
      window.location.href = "Details.html";
  };

  // Event listener for form submit
  const submitButton = document.querySelector(".submit-b");
  submitButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission (optional)

      // Update the summary table first before saving to local storage
      updateSummaryTable();
  });
});