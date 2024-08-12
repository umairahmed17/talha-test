window.addEventListener("load", function () {
  main();
});

function main() {
  slider.init();
}

const slider = {
  currentIndex: 0,

  init: function () {
    this.cacheDom();
    this.bindEvents();
    this.generateDots();
    this.render();
  },

  cacheDom: function () {
    this.$el = document.querySelector(".slider");
    this.$slides = this.$el.querySelectorAll(".slide");
    this.$prev = this.$el.querySelector(".prev");
    this.$next = this.$el.querySelector(".next");
    this.$dotsWrapper = this.$el.querySelector(".pagination");
  },

  generateDots: function () {
    this.$dotsWrapper.innerHTML = "";
    this.$slides.forEach((slide, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.setAttribute("aria-controls", "slide" + index);
      dot.setAttribute("data-index", index);
      dot.addEventListener("click", () => {
        const dir = index > this.currentIndex ? "slideInRight" : "slideInLeft";
        this.currentIndex = index;
        this.render(dir);
      });
      this.$dotsWrapper.appendChild(dot);
    });
  },

  bindEvents: function () {
    this.$prev.addEventListener("click", this.prev.bind(this));
    this.$next.addEventListener("click", this.next.bind(this));
  },

  prev: function () {
    this.currentIndex =
      this.currentIndex === 0 ? this.$slides.length - 1 : this.currentIndex - 1;
    this.render("slideInLeft");
  },

  next: function () {
    this.currentIndex =
      this.currentIndex === this.$slides.length - 1 ? 0 : this.currentIndex + 1;
    this.render("slideInRight");
  },

  render: function (transitionDirection = "none") {
    if (this.$slides.length === 0) {
      return;
    }

    if (this.currentIndex <= 0) {
      this.$prev.style.display = "none";
    } else {
      this.$prev.style.display = "block";
    }
    if (this.currentIndex >= this.$slides.length - 1) {
      this.$next.style.display = "none";
    } else {
      this.$next.style.display = "block";
    }

    this.$slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index !== this.currentIndex);
      slide.setAttribute("aria-labelledby", "slide" + index);
      slide.classList.toggle("active", index === this.currentIndex);
    });

    if (transitionDirection === "slideInRight") {
      this.slideInRight();
    } else if (transitionDirection === "slideInLeft") {
      this.slideInLeft();
    }

    this.$dotsWrapper.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  },

  slideInRight: function () {
    const currentSlide =
      this.currentIndex !== 0
        ? this.$slides[this.currentIndex]
        : this.$slides[this.$slides.length - 1];
    currentSlide.classList.add("slideInRight");

    currentSlide.addEventListener("animationend", () => {
      currentSlide.classList.remove("slideInRight", "slideOutRight");
    });
  },

  slideInLeft: function () {
    const currentSlide =
      this.currentIndex !== this.$slides.length - 1
        ? this.$slides[this.currentIndex]
        : this.$slides[0];
    currentSlide.classList.add("slideInLeft");

    currentSlide.addEventListener("animationend", () => {
      currentSlide.classList.remove("slideInLeft", "slideOutLeft");
    });
  },
};


document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('country-select');
  
  const countries = [
      "United States", "Canada", "Mexico", "Brazil", "Argentina", 
      "United Kingdom", "France", "Germany", "Italy", "Spain", 
      "Australia", "New Zealand", "Japan", "China", "India", 
      "South Korea", "Russia", "South Africa", "Egypt", "Nigeria"
  ];

  countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
  });

  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const country = document.getElementById('country-select').value;

    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      country: country
    };
    
    console.log('Form Submitted:', formData);
    alert('Form submitted successfully!');
    window.location.href = 'success.html'; 
  });
});
