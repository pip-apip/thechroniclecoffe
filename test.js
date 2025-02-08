<div style="padding: 1rem">
  <div class="flex flex-col gap-3" style="padding: 1rem">
    <!-- Ann_sub_category in red and bold, upper case -->
    <div class="fs-14 fw-600 text-red-600 uppercase text-center">
      {{data.ann_content_category}}
    </div>

    <!-- State and District information -->
    <div class="fs-16 fw-600">{{data.State}} - {{data.District}}</div>
    <div class="flex items-center gap-3 fs-14 fw-400 text-muted">
      <div>{{data.process_date}}</div>
    </div>
  </div>

  <!-- Image as headline -->
  <div class="headline-image">
    <img src="{{data.Images}}" alt="Headline Image" class="w-full h-auto" />
  </div>

  <div class="card p-6 flex flex-col gap-6">
    <div class="flex flex-col gap-0">
      <div class="fs-16 fw-600">Summary</div>
      <div class="text-overflow" id="summary">{{data.Summary}}</div>
    </div>

    <div class="flex justify-between items-start">
      <div class="flex flex-col">
        <div>Related Link:</div>
        <!-- URL kini dapat diklik -->
        <a href="{{data.URL}}" class="style-url underline" target="_blank"
          >{{data.URL}}</a
        >
      </div>
      <div class="flex gap-3 fs-14 fw-400 text-muted">
        <img
          src="https://app.ebdeskfusion.ai/cdn/media/fusion/assets/Source.svg"
          alt="Relevance Icon"
          width="16"
          height="16"
        />
        <span>Relevance Score:</span>
        <span class="fs-16 fw-600 text-blue-800"
          >{{thousandFormat data.RelevanceScore}}</span
        >
      </div>
    </div>
  </div>

  <div class="flex justify-end">
    <a href="detail-isu?id_issue={{data.id}}" target="_blank">
      <button
        class="bg-blue-800 text-white py-3 px-6 fs-14 fw-600 flex items-center gap-3 mt-5"
        style="border-radius: 0.57143rem"
      >
        View Details
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12.5 4V10.5C12.5 10.6326 12.4473 10.7598 12.3536 10.8536C12.2598 10.9473 12.1326 11 12 11C11.8674 11 11.7402 10.9473 11.6465 10.8536C11.5527 10.7598 11.5 10.6326 11.5 10.5V5.20687L4.35375 12.3538C4.25993 12.4476 4.13269 12.5003 4 12.5003C3.86732 12.5003 3.74007 12.4476 3.64625 12.3538C3.55243 12.2599 3.49973 12.1327 3.49973 12C3.49973 11.8673 3.55243 11.7401 3.64625 11.6462L10.7931 4.5H5.5C5.3674 4.5 5.24022 4.44732 5.14645 4.35355C5.05268 4.25979 5 4.13261 5 4C5 3.86739 5.05268 3.74021 5.14645 3.64645C5.24022 3.55268 5.3674 3.5 5.5 3.5H12C12.1326 3.5 12.2598 3.55268 12.3536 3.64645C12.4473 3.74021 12.5 3.86739 12.5 4Z"
            fill="white"
          ></path>
        </svg>
      </button>
    </a>
  </div>
</div>

  <div id="profilingModal" class="modal-ayam">
    <div class="modal-content">
      <button class="close-button" onclick="closeModal()">&times;</button>
      <div id="modalContent" class="modalContentStyle">

      </div>
    </div>
  </div>

  <div class="flex items-center justify-center gap-2 h-100%">
<!-- Button Detail Investigation -->
<div class="flex justify-center mt-5">
    <button
      class="bg-green-500 text-white text-sm py-2 px-4 fs-14 fw-600 flex items-center gap-3"
      style="border-radius: 0.57143rem"
      role="button"
      id="generateButton"
      modal-show-id="modal-generate"
      onclick="fetchDataFraud()"
    >
      Generate Insight
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M12.5 4V10.5C12.5 10.6326 12.4473 10.7598 12.3536 10.8536C12.2598 10.9473 12.1326 11 12 11C11.8674 11 11.7402 10.9473 11.6465 10.8536C11.5527 10.7598 11.5 10.6326 11.5 10.5V5.20687L4.35375 12.3538C4.25993 12.4476 4.13269 12.5003 4 12.5003C3.86732 12.5003 3.74007 12.4476 3.64625 12.3538C3.55243 12.2599 3.49973 12.1327 3.49973 12C3.49973 11.8673 3.55243 11.7401 3.64625 11.6462L10.7931 4.5H5.5C5.3674 4.5 5.24022 4.44732 5.14645 4.35355C5.05268 4.25979 5 4.13261 5 4C5 3.86739 5.05268 3.74021 5.14645 3.64645C5.24022 3.55268 5.3674 3.5 5.5 3.5H12C12.1326 3.5 12.2598 3.55268 12.3536 3.64645C12.4473 3.74021 12.5 3.86739 12.5 4Z"
          fill="white"
        ></path>
      </svg>
    </button>
</div>

<!-- CSS styling for text overflow -->
<style>
  .headline-image {
    display: flex;
    justify-content: center; /* Untuk memposisikan gambar secara horizontal di tengah */
    align-items: center; /* Untuk memposisikan gambar secara vertikal di tengah */
    width: 100%; /* Agar kontainer memenuhi lebar */
    height: 300px; /* Sesuaikan dengan tinggi yang diinginkan */
    overflow: hidden; /* Agar bagian gambar yang melampaui batas kontainer tidak terlihat */
  }

  .headline-image img {
    width: 100%; /* Agar gambar memenuhi lebar kontainer */
    max-width: 800px; /* Batasi lebar gambar maksimal */
    height: auto; /* Menjaga proporsi gambar */
    object-fit: cover; /* Menyesuaikan gambar dengan kontainer tanpa merusak rasio */
  }

  .text-overflow {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limit to 3 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-red-600 {
    color: red;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .text-center {
    text-align: center;
  }
</style>
