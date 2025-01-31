function loadTemplate(url) {
  return fetch(url).then((response) => response.text());
}

// Fetch the data and the template
Promise.all([
  fetch("https://jsonplaceholder.typicode.com/photos?_limit=25") // Limit to 25 items
    .then((res) => res.json()),
  loadTemplate("../template/catalogue-data.hbs"), // Load the Handlebars template
])
  .then(([data, templateSource]) => {
    // Specify the index you want to display
    const specificIndex = 2; // Change this to the desired index

    // Check if the index is within the bounds of the data array
    if (specificIndex >= 0 && specificIndex + 1 < data.length) {
      const specificData = [data[specificIndex], data[specificIndex + 1]]; // Create an array with the specific item

      // Compile the Handlebars template
      const template = Handlebars.compile(templateSource);

      // Render the template with the specific data
      const html = template(specificData); // Pass the array with the specific item

      // Insert the rendered HTML into the DOM
      document.getElementById("content-catalogue").innerHTML = html;
    } else {
      console.error("Index out of bounds");
    }
  })
  .catch((error) => console.error("Error fetching data or template:", error));

// Fetch the data and the template
Promise.all([
  fetch("https://jsonplaceholder.typicode.com/photos?_limit=25") // Limit to 25 items
    .then((res) => res.json()),
  loadTemplate("../template/recommendation-list.hbs"), // Load the Handlebars template
])
  .then(([data, templateSource]) => {
    // Specify the index you want to display
    const specificIndex = 2; // Change this to the desired index

    // Check if the index is within the bounds of the data array
    if (specificIndex >= 0 && specificIndex + 1 < data.length) {
      const specificData = [data[specificIndex], data[specificIndex + 1]]; // Create an array with the specific item

      // Compile the Handlebars template
      const template = Handlebars.compile(templateSource);

      // Render the template with the specific data
      const html = template(specificData); // Pass the array with the specific item

      // Insert the rendered HTML into the DOM
      document.getElementById("recommendation-list-chronicles").innerHTML =
        html;
    } else {
      console.error("Index out of bounds");
    }
  })
  .catch((error) => console.error("Error fetching data or template:", error));

// Fetch the data and the template
Promise.all([
  fetch("https://jsonplaceholder.typicode.com/photos?_limit=25") // Limit to 25 items
    .then((res) => res.json()),
  loadTemplate("../template/blog.hbs"), // Load the Handlebars template
])
  .then(([data, templateSource]) => {
    const specificIndex = 2; // Change this to the desired index

    // Check if the index is within the bounds of the data array
    if (specificIndex >= 0 && specificIndex + 1 < data.length) {
      const specificData = [data[specificIndex], data[specificIndex + 1]]; // Create an array with the specific item

      // Compile the Handlebars template
      const template = Handlebars.compile(templateSource);

      // Render the template with the specific data
      const html = template(specificData); // Pass the array with the specific item

      // Insert the rendered HTML into the DOM
      document.getElementById("blog-data").innerHTML = html;
    } else {
      console.error("Index out of bounds");
    }
  })
  .catch((error) => console.error("Error fetching data or template:", error));

async function renderTemplates() {
  try {
    const [
      navbarTemplateSource,
      landingTemplateSource,
      catalogueTemplateSource,
      topProductTemplateSource,
      articlesTemplateSource,
      footerTemplateSource,
    ] = await Promise.all([
      loadTemplate("../template/navbar.hbs"),
      loadTemplate("../template/landing-page.hbs"),
      loadTemplate("../template/catalogue.hbs"),
      loadTemplate("../template/top-product.hbs"),
      loadTemplate("../template/articles.hbs"),
      loadTemplate("../template/footer.hbs"),
    ]);

    // Compile the Handlebars templates
    const navbarTemplate = Handlebars.compile(navbarTemplateSource);
    const landingTemplate = Handlebars.compile(landingTemplateSource);
    const catalogueTemplate = Handlebars.compile(catalogueTemplateSource);
    const topProductTemplate = Handlebars.compile(topProductTemplateSource);
    const articlesTemplate = Handlebars.compile(articlesTemplateSource);
    const footerTemplate = Handlebars.compile(footerTemplateSource);

    const navbarHtml = navbarTemplate([]); // Pass the navbar data
    const landingHtml = landingTemplate([]); // Pass the footer data
    const catalogueHtml = catalogueTemplate([]); // Pass the footer data
    const topProductHtml = topProductTemplate([]); // Pass the navbar data
    const articlesHtml = articlesTemplate([]); // Pass the navbar data
    const footerHtml = footerTemplate([]); // Pass the footer data

    // Insert the rendered HTML into the DOM
    document.getElementById("navbar-chronicles").innerHTML = navbarHtml;
    document.getElementById("landing-chronicles").innerHTML = landingHtml;
    document.getElementById("catalogue-chronicles").innerHTML = catalogueHtml;
    document.getElementById("top-product-chronicles").innerHTML =
      topProductHtml;
    document.getElementById("blog-chronicles").innerHTML = articlesHtml;
    document.getElementById("footer-chronicles").innerHTML = footerHtml;

    console.log("Templates rendered successfully");
  } catch (error) {
    console.error("Error fetching data or template:", error);
  }
}

// Ensure the DOM is fully loaded before running the function
document.addEventListener("DOMContentLoaded", () => {
  renderTemplates();
});
