function loadTemplate(url) {
  return fetch(url).then((response) => response.text());
}

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
      loadTemplate("./javascript/template/navbar.hbs"),
      loadTemplate("./javascript/template/landing-page.hbs"),
      loadTemplate("./javascript/template/catalogue.hbs"),
      loadTemplate("./javascript/template/top-product.hbs"),
      loadTemplate("./javascript/template/articles.hbs"),
      loadTemplate("./javascript/template/footer.hbs"),
    ]);

    // Compile the Handlebars templates
    const navbarTemplate = Handlebars.compile(navbarTemplateSource);
    const landingTemplate = Handlebars.compile(landingTemplateSource);
    const catalogueTemplate = Handlebars.compile(catalogueTemplateSource);
    const topProductTemplate = Handlebars.compile(topProductTemplateSource);
    const articlesTemplate = Handlebars.compile(articlesTemplateSource);
    const footerTemplate = Handlebars.compile(footerTemplateSource);

    // Render the templates
    document.getElementById("navbar-chronicles").innerHTML = navbarTemplate([]);
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
      "https://jsonplaceholder.typicode.com/photos?_limit=25"
    );
    const data = await response.json();

    // Render catalogue content
    renderCatalogue(data);
    // Render recommendation list
    renderRecommendationList(data);
    // Render blog data
    renderBlogData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderCatalogue(data) {
  const specificIndex = 2; // Change this to the desired index
  if (specificIndex >= 0 && specificIndex + 10 < data.length) {
    const specificData = [data[specificIndex], data[specificIndex + 10]];
    loadTemplate("./javascript/template/catalogue.hbs").then(
      (templateSource) => {
        const template = Handlebars.compile(templateSource);
        const html = template(specificData);
        console.log(html);
        document.getElementById("catalogue-content").innerHTML = html;
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

// Ensure the DOM is fully loaded before running the function
document.addEventListener("DOMContentLoaded", () => {
  renderTemplates();
});
