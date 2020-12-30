// When the user clicks the button, open the modal 
var contributeButton = document.getElementById("contribute_form");
contributeButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById("contribute_modal");

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const openFramaformButton = document.querySelector('#open_framaform_button');
openFramaformButton.onclick = function () {
    const shopTypes = document.querySelectorAll('input[name="choice"]');

    // Get selected value
    let selectedValue;
    for (const shopType of shopTypes) {
        if (shopType.checked) {
            selectedValue = shopType.value;
            break;
        }
    }

    // Act depending on value
    var url = "";
    switch(selectedValue) {
    case "bulk_only_fixed":
      url = "https://framaforms.org/ajouter-une-epicerie-dediee-au-vrac-sur-cartovrac-1607979848"; 
      break;
    case "itinerant":
      url = "https://framaforms.org/ajouter-une-epicerie-itinerante-dediee-au-vrac-sur-cartovrac-1609347393"; 
      break;
    case "bulk_yes_fixed":
      url = "https://framaforms.org/ajouter-un-commerce-contenant-un-rayon-vrac-sur-cartovrac-1609346356"; 
      break;
    default:
  } 

  window.open(url);
};