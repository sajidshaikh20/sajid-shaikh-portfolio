'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    if (select) {
      elementToggleFunc(select);
    }
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const successMessage = document.getElementById("form-success");
const errorMessage = document.getElementById("form-error");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Initialize EmailJS with working credentials
emailjs.init("6LXxfCSjbNlXp-CBk");

// form submission handling
form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Hide any previous messages
  successMessage.style.display = "none";
  errorMessage.style.display = "none";
  
  // Disable submit button and show loading
  formBtn.disabled = true;
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
  
  // Get form data
  const formData = {
    from_name: form.querySelector('input[name="fullname"]').value,
    from_email: form.querySelector('input[name="email"]').value,
    message: form.querySelector('textarea[name="message"]').value,
    to_email: 'Sajid20shaikh@gmail.com'
  };
  
  // Send email using EmailJS
  emailjs.send('service_portfolio', 'template_contact', formData)
    .then(function(response) {
      // Success
      successMessage.style.display = "block";
      successMessage.classList.add("show");
      form.reset();
      formBtn.setAttribute("disabled", "");
    }, function(error) {
      // Error
      errorMessage.style.display = "block";
      errorMessage.classList.add("show");
    })
    .finally(() => {
      // Re-enable submit button
      formBtn.disabled = false;
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    // Remove active class from all pages and nav links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }

    // Get the text content and convert to lowercase
    const clickedText = this.textContent.trim().toLowerCase();
    
    // Find matching page and activate it
    for (let j = 0; j < pages.length; j++) {
      if (clickedText === pages[j].dataset.page) {
        pages[j].classList.add("active");
        this.classList.add("active");
        window.scrollTo(0, 0);
        break;
      }
    }

  });
}