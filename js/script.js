// Open hamburger menu
$("#open-menu").on("click", function () {
  $("#navbar-search").toggleClass("hidden");
  // $("#list-menu").removeClass("hidden");
});

// Open search input
$("#search-icon").on("click", function () {
  $("#navbar-search").toggleClass("hidden");
  // $("#list-menu").addClass("hidden");
  $("#search-input2").focus();
});

// API (Max 10 data yang ditampilkan)
// Dimasukkan ke function agar mudah digunakan kembali
function searchMovies(input) {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "93ff9a2",
      s: $(input).val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        // $("#list-menu").removeClass("hidden");
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(`
                  <div
                    class="w-full sm:w-1/2 xl:w-1/3 mx-3 my-4 max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <a href="#">
                      <img class="w-full rounded-t-lg" src="${data.Poster}" alt="" />
                    </a>
                    <div class="p-5">
                      <a href="#">
                        <h5
                          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                        >
                          ${data.Title}
                        </h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        ${data.Year}
                      </p>
                      <a
                        href="#"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        id="static-modal-btn" data-id="${data.imdbID}"
                      >
                        See details
                        <svg
                          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
            `);
        });
        $("#search-input2").val("");
      } else {
        $("#movie-list").html(
          `<h1 class="text-center text-3xl mt-2 font-bold">${result.Error}</h1>`
        );
      }
    },
  });
}

// Ketika button cari di klik
// Tampilkan smua film yg dicari
$("#search-btn").on("click", function () {
  searchMovies();
});

// Ketika mengetik di pencarian/input2 lalu enter
// Tampilkan smua film yg dicari
$("#search-input2").on("keyup", function (e) {
  if (e.keyCode == 13) {
    searchMovies("#search-input2");
  }
});

// Tampilkan smua film yg dicari ketika mengklik enter
$("#search-input1").on("keyup", function (e) {
  if (e.keyCode == 13) {
    searchMovies("#search-input1");
  }
});

// Trigger Button Modal
$("#movie-list").on("click", "#static-modal-btn", function (e) {
  $("div#static-modal").show();
  e.preventDefault();
  $.ajax({
    url: "http://omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "93ff9a2",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response == "True") {
        $(".modal-body").html(`
          <div class="flex flex-wrap gap-[2%]">
                <div class="w-[38%]">
                  <img src="${movie.Poster}" class="w-full h-[calc(100%-10%)]" alt="" />
                </div>
                <div class="w-[60%]">
                  <ul
                    class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li
                      class="w-full text-3xl font-bold px-4 py-3 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                    >
                      Title: ${movie.Title}
                    </li>
                    <li
                      class="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                    >
                      Released: ${movie.Released}
                    </li>
                    <li
                      class="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                    >
                      Genre: ${movie.Genre}
                    </li>
                    <li
                      class="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                    >
                      Director: ${movie.Director}
                    </li>
                    <li class="w-full px-4 py-3 rounded-b-lg">Rating: ${movie.imdbRating} (${movie.imdbVotes} Votes)</li>
                  </ul>
                </div>
              </div>
          `);
      }
    },
  });
});
// Problem: Event Binding/Delegation
// Yang dimana #static-modal-btn di tempel didalam jquery yang belum ada/belum muncul di html
// sehingga dianggap id kosong karena ketika fungsi dijalankan, element dengan id tersebut blum ada
// oleh karena itu, event nya dipindahkan ke parent elementnya

// Button Modal Close
$(".close-btn").on("click", function () {
  $("div#static-modal").hide();
});

// Button Modal Close
$("#synopsis-btn").on("click", function () {
  $("div#static-modal").hide();
});

// $("#search-btn").on("click", function () {
//   $.ajax({
//     url: "http://omdbapi.com",
//     type: "get",
//     dataType: "json",
//     data: {
//       apikey: "93ff9a2",
//       s: $("#search-input2").val(),
//     },
//     success: function (result) {
//       if (result.Response == "True") {
//       } else {
//         $("#movie-list").html("<h1>Movie Not Found</h1>");
//       }
//     },
//   });
// });
