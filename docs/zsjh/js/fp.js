window.addEventListener('DOMContentLoaded', () => {
    FingerprintJS.load().then((fp) => {
      return fp.get();
    }).then(result => {
      // Get a reference to the input element
      let input = document.getElementById("QQQQQQQ");
  
      // Set the value of the input element to the visitorId
      input.value = result.visitorId;
    });
  });