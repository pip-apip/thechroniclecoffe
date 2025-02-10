document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Show the loader when the page starts loading
  document.getElementById("loader").style.display = "flex";

  // Hide the loader when the page is fully loaded
  window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
  });

  // Load all necessary scripts first
  Promise.all([
    loadScript(
      "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"
    ),
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"),
    loadScript("https://kit.fontawesome.com/dbf5af6bac.js"),
    loadScript("https://code.jquery.com/jquery-3.7.1.min.js"),
  ])
    .then(() => {
      // Load Flowbite before rendering templates
      return loadScript(
        "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"
      );
    })
    .then(() => {
      // Initialize the maps after all scripts are loaded

      // Load and compile templates after initializing maps
      const templates = {
        header: loadTemplate("javascript/template/navbar.hbs"),
        headerCatalogue: loadTemplate("javascript/template/navbar-catalog.hbs"),
        landing: loadTemplate("javascript/template/landing-page.hbs"),
        blogCatalogue: loadTemplate("javascript/template/article-catalog.hbs"),
        topProduct: loadTemplate("javascript/template/top-product.hbs"),
        catalogue: loadTemplate("javascript/template/catalogue.hbs"),
        recommendationList: loadTemplate(
          "javascript/template/recommendation-list.hbs"
        ),
        mapGallery: loadTemplate("javascript/template/map-gallery.hbs"),
        footer: loadTemplate("javascript/template/footer.hbs"),
      };

      // Render templates into the DOM
      return Promise.all(Object.values(templates));
    })
    .then(
      ([
        headerTemplate,
        headerCatalogue,
        landing,
        blogCatalogue,
        topProduct,
        catalogue,
        recommendationList,
        mapGallery,
        footerTemplate,
      ]) => {
        // Function to safely set innerHTML if the element exists
        const setInnerHTMLIfExists = (id, template, data) => {
          const element = document.getElementById(id);
          if (element) {
            element.innerHTML = template(data);
          }
        };

        setInnerHTMLIfExists("header", headerTemplate);
        setInnerHTMLIfExists("header-catalog", headerCatalogue);
        setInnerHTMLIfExists("landing-page", landing);
        setInnerHTMLIfExists("article-catalog", blogCatalogue, [
          {
            title: "My Awesome Website",
            homeLink: "Home",
            aboutLink: "About",
            contactLink: "Contact",
          },
          // ... (other items)
        ]);
        setInnerHTMLIfExists("top-product", topProduct);
        setInnerHTMLIfExists("catalogue", catalogue, [
          {
            title: "My Awesome Website",
            homeLink: "Home",
            aboutLink: "About",
            contactLink: "Contact",
          },
          // ... (other items)
        ]);
        setInnerHTMLIfExists("recommendation-list", recommendationList);
        setInnerHTMLIfExists("map-gallery", mapGallery);
        setInnerHTMLIfExists("footer", footerTemplate);

        initializeMaps();

        loadScript(
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        );
      }
    )
    .catch((error) => console.error("Error loading templates:", error));
});

// Function to load and compile a Handlebars template
function loadTemplate(path) {
  return fetch(path)
    .then((response) => response.text())
    .then((templateSource) => Handlebars.compile(templateSource))
    .catch((error) => {
      console.error(`Error loading template ${path}:`, error);
      throw error;
    });
}

// Function to load a script and return a Promise
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

// Function to initialize the maps
function initializeMaps() {
  // Initialize the first map and set its view to Jakarta
  const map = L.map("map").setView([-6.4313695, 106.8928713], 12); // Coordinates for Jakarta

  // Add CartoDB Positron tile layer
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
      attribution: "© OpenStreetMap, © CartoDB",
    }
  ).addTo(map);

  // Add a marker for Jakarta
  const marker = L.marker([-6.4313695, 106.8928713]).addTo(map);
  marker
    .bindPopup("<b>The Chronicles</b><br>This is our Headquarters.")
    .openPopup();

  // Initialize the second map and set its view to Jakarta
  const map2 = L.map("map-2").setView([-6.4313695, 106.8928713], 12); // Coordinates for Jakarta

  // Add CartoDB Positron tile layer
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
      attribution: "© OpenStreetMap, © CartoDB",
    }
  ).addTo(map2);

  // Add a marker for Jakarta
  const marker2 = L.marker([-6.4313695, 106.8928713]).addTo(map2);
  marker2
    .bindPopup("<b>The Chronicles</b><br>This is our Headquarters.")
    .openPopup();
}
