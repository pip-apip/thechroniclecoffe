document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInOnScroll = () => {
    fadeElements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      // Check if the element is in the viewport

      if (rect.top < windowHeight && rect.bottom > 0) {
        element.classList.add("visible");
      }
    });
  };

  fadeInOnScroll();

  window.addEventListener("scroll", fadeInOnScroll);
});

function zoomImage(imageId) {
  const img = document.getElementById(imageId);
  const zoomedImg = document.createElement("img");
  zoomedImg.src = img.src;
  zoomedImg.style.width = "80%"; // Adjust size as needed
  zoomedImg.style.height = "auto";
  zoomedImg.style.position = "fixed";
  zoomedImg.style.top = "50%";
  zoomedImg.style.left = "50%";
  zoomedImg.style.transform = "translate(-50%, -50%)";
  zoomedImg.style.zIndex = "1000";
  zoomedImg.style.cursor = "zoom-out";
  zoomedImg.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
  zoomedImg.onclick = function () {
    document.body.removeChild(zoomedImg);
  };
  document.body.appendChild(zoomedImg);
}

// function loadTemplate(url) {
//   return fetch(url).then((response) => response.text());
// }

// // async function renderTemplates() {
// //   try {
// //     const [
// //       landingTemplateSource,
// //       catalogueTemplateSource,
// //       topProductTemplateSource,
// //       articlesTemplateSource,
// //       footerTemplateSource,
// //     ] = await Promise.all([
// //       loadTemplate("./javascript/template/landing-page.hbs"),
// //       loadTemplate("./javascript/template/catalogue.hbs"),
// //       loadTemplate("./javascript/template/top-product.hbs"),
// //       loadTemplate("./javascript/template/articles.hbs"),
// //       loadTemplate("./javascript/template/footer.hbs"),
// //     ]);

// //     // Compile the Handlebars templates
// //     const landingTemplate = Handlebars.compile(landingTemplateSource);
// //     const catalogueTemplate = Handlebars.compile(catalogueTemplateSource);
// //     const topProductTemplate = Handlebars.compile(topProductTemplateSource);
// //     const articlesTemplate = Handlebars.compile(articlesTemplateSource);
// //     const footerTemplate = Handlebars.compile(footerTemplateSource);

// //     // Render the templates
// //     document.getElementById("landing-chronicles").innerHTML = landingTemplate(
// //       []
// //     );
// //     document.getElementById("catalogue-chronicles").innerHTML =
// //       catalogueTemplate([]);
// //     document.getElementById("top-product-chronicles").innerHTML =
// //       topProductTemplate([]);
// //     document.getElementById("blog-chronicles").innerHTML = articlesTemplate([]);

// //     console.log("Templates rendered successfully");
// //   } catch (error) {
// //     console.error("Error fetching data or template:", error);
// //   }
// // }

// async function fetchAndRenderData() {
//   try {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/photos?_limit=8"
//     );
//     const data = await response.json();
//     renderBlogData3(data);
//     renderBlogData2(data);
//     renderCatalogue(data);
//     renderCatalogue2(data);
//     renderRecommendationList(data);
//     renderBlogData(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// function renderCatalogue(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = [data[specificIndex], data[specificIndex + 10]];
//     loadTemplate("./javascript/template/catalogue-data.hbs").then(
//       (templateSource) => {
//         const template = Handlebars.compile(templateSource);
//         const html = template(specificData);
//         document.getElementById("catalogue-content").innerHTML = html;
//       }
//     );
//   } else {
//     console.error("Index out of bounds for catalogue");
//   }
// }

// function renderCatalogue2(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = data;
//     loadTemplate("./javascript/template/catalogue-data.hbs").then(
//       (templateSource) => {
//         const template = Handlebars.compile(templateSource);
//         const html = template(specificData);
//         document.getElementById("catalogue-content_2").innerHTML = html;
//       }
//     );
//   } else {
//     console.error("Index out of bounds for catalogue");
//   }
// }

// function renderRecommendationList(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = [data[specificIndex], data[specificIndex + 1]];
//     loadTemplate("./javascript/template/recommendation-list.hbs").then(
//       (templateSource) => {
//         const template = Handlebars.compile(templateSource);
//         const html = template(specificData);
//         document.getElementById("recommendation-list-chronicles").innerHTML =
//           html;
//       }
//     );
//   } else {
//     console.error("Index out of bounds for recommendation list");
//   }
// }

// function renderBlogData(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = [data[specificIndex], data[specificIndex + 1]];
//     loadTemplate("./javascript/template/blog.hbs").then((templateSource) => {
//       const template = Handlebars.compile(templateSource);
//       const html = template(specificData);
//       document.getElementById("blog-data").innerHTML = html;
//     });
//   } else {
//     console.error("Index out of bounds for blog data");
//   }
// }

// function renderBlogData2(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = data;
//     loadTemplate("./javascript/template/blog.hbs").then((templateSource) => {
//       const template = Handlebars.compile(templateSource);
//       const html = template(specificData);
//       document.getElementById("blog-data2").innerHTML = html;
//     });
//   } else {
//     console.error("Index out of bounds for blog data");
//   }
// }

// function renderBlogData3(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = data;
//     loadTemplate("./javascript/template/blog.hbs").then((templateSource) => {
//       const template = Handlebars.compile(templateSource);
//       const html = template(specificData);
//       document.getElementById("blog-data3").innerHTML = html;
//     });
//   } else {
//     console.error("Index out of bounds for blog data");
//   }
// }

// // Ensure the DOM is fully loaded before running the function
// document.addEventListener("DOMContentLoaded", async () => {
//   // Wait for templates to render first
//   // await renderTemplates();

//   // Fetch data after templates are rendered
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/photos?_limit=8"
//   );
//   const data = await response.json();

//   // Render catalogue menus
//   renderCatalogueMenu(data);
//   renderCatalogueMenuSM(data);

//   // Fetch and render additional data
//   await fetchAndRenderData();
// });

// function renderCatalogueMenu(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = data;
//     loadTemplate("./javascript/template/catalogue-page.hbs").then(
//       (templateSource) => {
//         const template = Handlebars.compile(templateSource);
//         const html = template(specificData);
//         document.getElementById("catalogue-content_2").innerHTML = html;
//       }
//     );
//   } else {
//     console.error("Index out of bounds for catalogue");
//   }
// }

// function renderCatalogueMenuSM(data) {
//   const specificIndex = 2; // Change this to the desired index
//   if (specificIndex >= 0 && specificIndex + 1 < data.length) {
//     const specificData = data;
//     loadTemplate("./javascript/template/catalogue-page.hbs").then(
//       (templateSource) => {
//         const template = Handlebars.compile(templateSource);
//         const html = template(specificData);
//         document.getElementById("catalogue-content").innerHTML = html;
//       }
//     );
//   } else {
//     console.error("Index out of bounds for catalogue");
//   }
// }
