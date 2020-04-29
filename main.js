let contacts = [];

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */

function addContact(event) {
  let currentContact = {};
  event.preventDefault(); //to stop page from reloading
  let formTarget = event.target; //formTarget = the form element

  //reads in the names of the 'name' in our forms
  let contactName = formTarget.name.value;
  let contactPhone = formTarget.phone.value;
  let contactEmergencyContact = formTarget.emergencyContact.checked;  //since its a check box needs to return a bool

  currentContact = {
    id: generateId(),
    name: contactName,
    phone: contactPhone,
    emergencyContact: contactEmergencyContact
  }
  contacts.push(currentContact);
  saveContacts();
  formTarget.reset();
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  drawContacts();
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let retrievedContacts = JSON.parse(window.localStorage.getItem("contacts"));

  //if the local storage is not empty, then our contacts array will be 
  //set equal to contacts from local storage.
  if (retrievedContacts) {
    contacts = retrievedContacts;
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = " ";
  contacts.forEach((arrContactElem) => {

    // if the emergency contact checkbox is empty ..
    //the contact won't be added in the emergenct contact
    //else , it the contact will be added in the emergency contact
    if (arrContactElem.emergencyContact == false) {
      template += `
        <div class="card mt-1 mb-1">
          <h3 class="mt-1 mb-1">${arrContactElem.name}</h3>
          <div class="d-flex space-between">
            <p>
              <i class="fa fa-fw fa-phone"></i>
              <span>${arrContactElem.phone}</span>
            </p>
            <i class="action fa fa-trash text-danger" onclick="removeContact('${ arrContactElem.id}')"></i>
          </div> 
        </div>`
    }
    else {
      template += `
      <div class="card mt-1 mb-1 emergency-contact">
        <h3 class="mt-1 mb-1">${arrContactElem.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${arrContactElem.phone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${ arrContactElem.id}')"></i>
          </div>
      </div>`
    }
  });
  document.getElementById("contact-list").innerHTML = template;
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {

  //check to see if the contacts array length is greater than 1. 
  if (contacts.length < 0) {
    throw new Error("Invalid Contact ID");
  }
  for (let i = 0; i < contacts.length; i++) {
    if (contactId == contacts[i].id) {
      contacts.splice(i, 1);
      break;
    }
  }

  saveContacts();
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.toggle("hidden");

}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()