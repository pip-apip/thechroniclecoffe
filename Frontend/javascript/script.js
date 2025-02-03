$(document).ready(function () {
  $("#navbar").load("javascript/template/navbar.html");
});

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

function loadTemplate(url) {
  return fetch(url).then((response) => response.text());
}

async function renderTemplates() {
  try {
    const [
      landingTemplateSource,
      catalogueTemplateSource,
      topProductTemplateSource,
      articlesTemplateSource,
      footerTemplateSource,
    ] = await Promise.all([
      loadTemplate("./javascript/template/landing-page.hbs"),
      loadTemplate("./javascript/template/catalogue.hbs"),
      loadTemplate("./javascript/template/top-product.hbs"),
      loadTemplate("./javascript/template/articles.hbs"),
      loadTemplate("./javascript/template/footer.hbs"),
    ]);

    // Compile the Handlebars templates
    const landingTemplate = Handlebars.compile(landingTemplateSource);
    const catalogueTemplate = Handlebars.compile(catalogueTemplateSource);
    const topProductTemplate = Handlebars.compile(topProductTemplateSource);
    const articlesTemplate = Handlebars.compile(articlesTemplateSource);
    const footerTemplate = Handlebars.compile(footerTemplateSource);

    // Render the templates
    document.getElementById("landing-chronicles").innerHTML = landingTemplate(
      []
    );
    document.getElementById("catalogue-chronicles").innerHTML =
      catalogueTemplate([]);
    document.getElementById("top-product-chronicles").innerHTML =
      topProductTemplate([]);
    document.getElementById("blog-chronicles").innerHTML = articlesTemplate([]);
    document.getElementById("footer-chronicles").innerHTML = footerTemplate([]);

    console.log("Templates rendered successfully");

    // Call the function to fetch data after templates are rendered
    await fetchAndRenderData();
  } catch (error) {
    console.error("Error fetching data or template:", error);
  }
}

async function fetchAndRenderData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=8"
    );
    const data = await response.json();

    // Render catalogue content
    renderCatalogue(data);
    renderCatalogue2(data);
    // Render recommendation list
    renderRecommendationList(data);
    // Render blog data
    renderBlogData(data);
    renderBlogData2(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderCatalogue(data) {
  const specificIndex = 2; // Change this to the desired index
  if (specificIndex >= 0 && specificIndex + 1 < data.length) {
    const specificData = [data[specificIndex], data[specificIndex + 10]];
    loadTemplate("./javascript/template/catalogue-data.hbs").then(
      (templateSource) => {
        const template = Handlebars.compile(templateSource);
        const html = template(specificData);
        // console.log(html);
        document.getElementById("catalogue-content").innerHTML = html;
      }
    );
  } else {
    console.error("Index out of bounds for catalogue");
  }
}

function renderCatalogue2(data) {
  const specificIndex = 2; // Change this to the desired index
  if (specificIndex >= 0 && specificIndex + 1 < data.length) {
    const specificData = data;
    loadTemplate("./javascript/template/catalogue-data.hbs").then(
      (templateSource) => {
        const template = Handlebars.compile(templateSource);
        const html = template(specificData);
        // console.log(html);
        document.getElementById("catalogue-content_2").innerHTML = html;
      }
    );
  } else {
    console.error("Index out of bounds for catalogue");
  }
}

function renderRecommendationList(data) {
  const specificIndex = 2; // Change this to the desired index
  if (specificIndex >= 0 && specificIndex + 1 < data.length) {
    const specificData = [data[specificIndex], data[specificIndex + 1]];
    loadTemplate("./javascript/template/recommendation-list.hbs").then(
      (templateSource) => {
        const template = Handlebars.compile(templateSource);
        const html = template(specificData);
        document.getElementById("recommendation-list-chronicles").innerHTML =
          html;
      }
    );
  } else {
    console.error("Index out of bounds for recommendation list");
  }
}

function renderBlogData(data) {
  const specificIndex = 2; // Change this to the desired index
  if (specificIndex >= 0 && specificIndex + 1 < data.length) {
    const specificData = [data[specificIndex], data[specificIndex + 1]];
    loadTemplate("./javascript/template/blog.hbs").then((templateSource) => {
      const template = Handlebars.compile(templateSource);
      const html = template(specificData);
      document.getElementById("blog-data").innerHTML = html;
    });
  } else {
    console.error("Index out of bounds for blog data");
  }
}

function renderBlogData2(data) {
  const specificIndex = 2; // Change this to the desired index
  if (specificIndex >= 0 && specificIndex + 1 < data.length) {
    const specificData = data;
    loadTemplate("./javascript/template/blog.hbs").then((templateSource) => {
      const template = Handlebars.compile(templateSource);
      const html = template(specificData);
      document.getElementById("blog-data2").innerHTML = html;
    });
  } else {
    console.error("Index out of bounds for blog data");
  }
}

// Ensure the DOM is fully loaded before running the function
document.addEventListener("DOMContentLoaded", () => {
  renderTemplates();
});
