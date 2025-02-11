document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Show the loader when the page starts loading
  document.getElementById("loader").style.display = "flex";

  // Hide the loader when the page is fully loaded
  window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
  });

  // Load all necessary scripts first in the correct order
  Promise.all([
    loadScript("https://code.jquery.com/jquery-3.7.1.min.js"), // Load jQuery first
    loadScript(
      "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"
    ), // Load Handlebars
    loadScript("javascript/template/function.js"), // Load custom functions
    loadScript(
      "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"
    ), // Load Flowbite
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"), // Load Leaflet
    loadScript("https://kit.fontawesome.com/dbf5af6bac.js"), // Load FontAwesome
  ])
    .then(() => {
      // Load and compile templates after initializing maps
      const templates = {
        header: loadTemplate("javascript/template/navbar.hbs"),
        headerCatalogue: loadTemplate("javascript/template/navbar-catalog.hbs"),
        landing: loadTemplate("javascript/template/landing-page.hbs"),
        blogCatalogue: loadTemplate("javascript/template/article-catalog.hbs"),
        topProduct: loadTemplate("javascript/template/top-product.hbs"),
        productList: loadTemplate("javascript/template/product-list.hbs"),
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
        productList,
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
        setInnerHTMLIfExists("product-list", productList, [
          {
            title: "My Awesome Website",
            homeLink: "Home",
            aboutLink: "About",
            contactLink: "Contact",
          },
          // ... (other items)
        ]);
        setInnerHTMLIfExists("catalogue", catalogue, [
          {
            title: "My Awesome Website",
            homeLink: "Home",
            aboutLink: "About",
            contactLink: "Contact",
          },
          {
            title: "My Coffee Website",
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

function changeImage(newSrc) {
  document.getElementById("large-image").src = newSrc;
}

function showModal(index, title, image, description, origin, price) {
  // Create the modal content
  const modalContent = `
    <div id="helohelo-modal${index}" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0">
      <div class="relative p-4 w-full max-w-2xl max-h-screen bg-white rounded-lg shadow-sm transform transition-transform duration-300 scale-95">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">${title}</h3>
          <button
            type="button"
            class="close-modal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onclick="closeModal(${index})"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <!-- Image on the left -->
            <div class="w-full md:w-1/2">
              <img
                id="coffee-image1"
                src=".\\assets\\Robusta-Gayo.png"
                alt="${title}"
                class="w-full h-64 object-contain rounded-lg cursor-pointer"
                onclick="zoomImage('coffee-image1')"
              />
            </div>
            <!-- Content on the right -->
            <div class="w-full md:w-1/2 space-y-4">
              <p class="text-base leading-relaxed text-gray-500">${description}</p>
              <div class="flex items-center justify-between">
                <p class="text-lg font-semibold text-gray-900">Origin: ${origin}</p>
                <p class="text-lg font-semibold text-gray-900">${price}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to Cart
          </button>
          <button
            onclick="closeModal(${index})"
            type="button"
            class="close-modal py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  // Insert the modal into the body
  document.body.insertAdjacentHTML("beforeend", modalContent);

  // Trigger the transition by adding opacity and scale classes after a short delay
  setTimeout(() => {
    const modal = document.getElementById(`helohelo-modal${index}`);
    modal.classList.remove("hidden");
    modal.classList.remove("opacity-0");
    modal.classList.add("opacity-100");
    modal.querySelector(".scale-95").classList.remove("scale-95");
    modal.querySelector(".scale-95").classList.add("scale-100");
  }, 10);
}

function closeModal(index) {
  const modal = document.getElementById(`helohelo-modal${index}`);
  if (modal) {
    modal.remove();
  }
}
