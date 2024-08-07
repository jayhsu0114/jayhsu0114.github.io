sessionStorage.clear();

let data = []; // Array to store fetched data
let currentIndex = 0; // Index to track current data set

// Function to disable all buttons
function disableButtons() {
  document.querySelectorAll('button').forEach(button => {
    button.disabled = true;
  });
}

// Function to fill fields with '無待審核匿名'
function fillNoData() {
  document.getElementById('timestamp').value = '無待審核匿名';
  document.getElementById('userid').value = '無待審核匿名';
  document.getElementById('status').value = '無待審核匿名';
}

// Function to fetch data and populate the fields
async function fetchData() {
  try {
    const response = await fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/zsjh-sheet-data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    console.log(data);

    if (data.length > 0) {
      populateFields(currentIndex); // Populate fields with the first set of data
    } else {
      console.error('No data available.');
      fillNoData();
      disableButtons();
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function populateFields(index) {
  if (index >= 0 && index < data.length) {
    const dataSet = data[index];
    if (dataSet.length >= 4) {
      const statusValue = dataSet[3];
      document.getElementById('timestamp').value = dataSet[0];
      document.querySelector('textarea').value = dataSet[1];
      document.getElementById('userid').value = dataSet[2];
      document.getElementById('status').value = statusValue;

      // Check sessionStorage for matching keys
      if (sessionStorage.getItem(`${statusValue}/timestamp`)) {
        document.getElementById('timestamp').value = sessionStorage.getItem(`${statusValue}/timestamp`);
        document.querySelector('textarea').value = sessionStorage.getItem(`${statusValue}/textarea`);
        document.getElementById('userid').value = sessionStorage.getItem(`${statusValue}/userid`);
        document.getElementById('status').value = sessionStorage.getItem(`${statusValue}/status`);
        document.getElementById('managerid').value = sessionStorage.getItem(`${statusValue}/managerid`);
        document.getElementById('manager-status').value = sessionStorage.getItem(`${statusValue}/manager-status`);
      }
    } else {
      console.error('Insufficient data in the current set.');
    }
  } else {
    console.error('Index out of bounds.');
  }
}

function handleButtonClick(status) {
  const timestamp = document.getElementById('timestamp').value;
  const textareaValue = document.querySelector('textarea').value;
  const userid = document.getElementById('userid').value;
  const managerid = document.getElementById('managerid').value;
  const statusValue = document.getElementById('status').value;

  // Update manager-status
  document.getElementById('manager-status').value = status;

  // Save data to sessionStorage
  sessionStorage.setItem(`${statusValue}/timestamp`, timestamp);
  sessionStorage.setItem(`${statusValue}/textarea`, textareaValue);
  sessionStorage.setItem(`${statusValue}/userid`, userid);
  sessionStorage.setItem(`${statusValue}/status`, statusValue);
  sessionStorage.setItem(`${statusValue}/managerid`, managerid);
  sessionStorage.setItem(`${statusValue}/manager-status`, status);

  // Move to next record
  currentIndex++;
  if (currentIndex < data.length) {
    populateFields(currentIndex);
    // Check if the new record has sessionStorage values
    clearManagerStatusIfNotInSessionStorage();
  } else {
    console.error('No more data available.');
    document.querySelector('#edit-end button').classList.add('completed'); // Add the class to change button style
  }
}

function handleNavigation(direction) {
  if (direction === 'prev') {
    if (currentIndex > 0) {
      currentIndex--;
      populateFields(currentIndex);
      clearManagerStatusIfNotInSessionStorage();
    }
  } else if (direction === 'next') {
    if (currentIndex < data.length - 1) {
      const managerStatus = document.getElementById('manager-status').value;
      if (managerStatus === '') {
        showAlert('請先將這則匿名審核完再繼續');
      } else {
        currentIndex++;
        populateFields(currentIndex);
        clearManagerStatusIfNotInSessionStorage();
      }
    }
  }
}

function clearManagerStatusIfNotInSessionStorage() {
  const statusValue = document.getElementById('status').value;
  if (!sessionStorage.getItem(`${statusValue}/timestamp`)) {
    document.getElementById('manager-status').value = ''; // Clear manager-status if no matching data is found
  }
}

function showAlert(message) {
  alert(message); // You can replace this with a more sophisticated notification system if needed
}

window.onload = function() {
  fetchData();

  // Load username from localStorage and set it to managerid
  const username = localStorage.getItem('username');
  document.getElementById('managerid').value = username;

  // Add event listeners to the buttons
  document.getElementById('pass').addEventListener('click', function() {
    handleButtonClick('通過');
  });

  document.getElementById('fail').addEventListener('click', function() {
    handleButtonClick('不通過');
  });

  // Add event listeners for navigation buttons
  document.getElementById('prev').addEventListener('click', function() {
    handleNavigation('prev');
  });

  document.getElementById('next').addEventListener('click', function() {
    handleNavigation('next');
  });
};
