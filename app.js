const firstName = document.getElementById('first');
const firstNameError = document.querySelector('#first + span.error');

const lastName = document.getElementById('last');
const lastNameError = document.querySelector('#last + span.error');

const email = document.getElementById('email');
const form = document.querySelector('form');
const emailError = document.querySelector('#email + span.error');

const country = document.getElementById('country');

const zip = document.getElementById('ZIP');
const zipError = document.querySelector('#ZIP + span.error');

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');

const confirmPW = document.getElementById('confirmPW');
const confirmError = document.querySelector('#confirmPW + span.error');

const buttonSubmit = document.getElementById('submitBtn');

firstName.addEventListener('input', () => {
  if (firstName.validity.valid) {
    validInput(firstNameError);
  } else {
    customShowError(firstName, firstNameError, 'text');
  }
});

lastName.addEventListener('input', () => {
  if (lastName.validity.valid) {
    validInput(lastNameError);
  } else {
    customShowError(lastName, lastNameError, 'text');
  }
});

email.addEventListener('input', (event) => {
  if (email.validity.valid) {
    validInput(emailError);
  } else {
    customShowError(email, emailError, 'email');
  }
});

country.addEventListener('change', () => {
  checkZIP(zip, zipError);
});

zip.addEventListener('input', () => {
  if (zip.validity.valid) {
    validInput(zipError);
  } else {
    checkZIP(zip, zipError);
  }
});

password.addEventListener('input', () => {
  if (password.validity.valid) {
    validInput(passwordError);
  } else {
    customShowError(password, passwordError, 'password');
  }
});

confirmPW.addEventListener('input', () => {
  validatePassword(confirmError);
});

form.addEventListener('submit', (e) => {
  if (form.checkValidity() === false) {
    e.preventDefault();
  }
});

function validInput(spanName) {
  spanName.textContent = '';
  spanName.className = 'error';
}

//custom showError
function customShowError(inputName, spanName, type) {
  if (type === 'email') {
    if (inputName.validity.valueMissing) {
      spanName.textContent = 'You need to enter an email address';
    } else if (inputName.validity.typeMismatch) {
      spanName.textContent = 'Entered value needs to be an email address.';
    } else if (inputName.validity.tooShort) {
      spanName.textContent = `Email should be at least ${inputName.minLength} characters; you entered ${inputName.value.length}.`;
    }
    spanName.className = 'error active';
  } else if (type == 'text') {
    if (inputName.validity.valueMissing) {
      spanName.textContent = `You need to enter your ${inputName.id} name`;
    } else if (inputName.validity.typeMismatch) {
      spanName.textContent = `Just your ${inputName.id} name!.`;
    } else if (inputName.validity.tooShort) {
      spanName.textContent = `${inputName.id} name should be atleast ${inputName.minLength} characters; you entered ${inputName.value.length}.`;
    }
    spanName.className = 'error active';
  } else if (type == 'password') {
    if (inputName.validity.valueMissing) {
      spanName.textContent = 'You need to enter a password';
    } else if (inputName.validity.tooShort) {
      spanName.textContent = `Password should be atleast ${inputName.minLength}. You entered ${inputName.value.length}`;
    } else if (inputName.validity.tooLong) {
      spanName.textContent = `Password should be atleast ${inputName.maxlength}. You put ${inputName.value.length}`;
    }
    spanName.className = 'error active';
  }
}

function validatePassword(spanName) {
  const pass2 = document.getElementById('confirmPW').value;
  const pass1 = document.getElementById('password').value;

  if (pass1 !== pass2) {
    spanName.textContent = `Passwords do not match!`;
    spanName.className = 'error active';
  } else {
    validInput(spanName);
  }
}

function checkZIP(inputName, spanName) {
  const constraints = {
    us: [
      '^(US-)?\\d{5}$',
      'United States ZIPS must have exactly 5 digits: e.g US-11373 or 11373',
    ],
    ch: [
      '^(CH-)?\\d{4}$',
      'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'France ZIPs must have exactly 5 digits: e.g F-75012 or 75012',
    ],
    jpn: [
      '^(JPN-)?\\d{7}$',
      'Japan ZIPS must have exactly 7 digits: e.g NNN-NNNN or 163-8001',
    ],
  };

  const country = document.getElementById('country').value;

  const ZIPField = inputName;

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], '');

  // Check it!
  if (constraint.test(ZIPField.value)) {
    console.log('SO ITS TRUE');
  } else {
    spanName.textContent = `${constraints[country][1]}`;
  }
}
