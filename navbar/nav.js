// Self-contained navbar — replaces script#replace_with_navbar
(function() {
  var navHTML = '<div class="navbar">' +
    '<button class="menu-toggle">&#9776;</button>' +
    '<div class="menu">' +
      '<div class="dropdown"><a href="/index.html" class="dropbtn">HOME</a></div>' +
      '<div class="dropdown">' +
        '<button class="dropbtn">Hobbies <i class="fa fa-caret-down"></i></button>' +
        '<div class="dropdown-content">' +
          '<a href="/hobbies/cubes.html">Cubes</a>' +
          '<a href="/hobbies/videogames.html">Video games</a>' +
          '<a href="/hobbies/programming.html">Programming</a>' +
          '<a href="/hobbies/wrestling.html">Wrestling</a>' +
          '<a href="/hobbies/cooking.html">Cooking</a>' +
        '</div>' +
      '</div>' +
      '<div class="dropdown">' +
        '<button class="dropbtn">Javascript <i class="fa fa-caret-down"></i></button>' +
        '<div class="dropdown-content">' +
          '<a href="/javascript/scripts.html">Simple canvas</a>' +
          '<a href="/javascript/JS_all_shapes.html">JS all shapes</a>' +
          '<a href="/javascript/interactive JS.html">Interactive JS</a>' +
          '<a href="/javascript/funny_line.html">Funny line</a>' +
          '<a href="/javascript/graph/index.html">Graph</a>' +
          '<a href="/javascript/mazeGenerator/mazeG.html">Maze Generator</a>' +
          '<a href="/javascript/goat/goat.html">Goat Problem</a>' +
          '<a href="/javascript/elipes/index.html">Elipse</a>' +
          '<a href="/javascript/isometric3d/index.html">isometric 3d</a>' +
        '</div>' +
      '</div>' +
      '<div class="dropdown">' +
        '<button class="dropbtn">Games <i class="fa fa-caret-down"></i></button>' +
        '<div class="dropdown-content">' +
          '<a href="/GAMES/HexMines/index.html">Canvas HexMines</a>' +
          '<a href="/GAMES/ConnectFour/conn4.html">Connect Four (p5.js)</a>' +
          '<a href="/GAMES/FlappyThing/flappy.html" class="doNotShowInMobile">Canvas Flappy Thing</a>' +
          '<a href="/GAMES/BomberMan/index.html" class="doNotShowInMobile">Canvas BomberMan</a>' +
          '<a href="/GAMES/CandyCrush Variants/JS_Canvas_CandyCrush/index.html">Canvas Candy Crush Game</a>' +
          '<a href="/GAMES/JS_Canvas_Pong/index.html" class="doNotShowInMobile">Canvas Pong Game</a>' +
          '<a href="/GAMES/JS_Canvas_15puzzle/index.html">Canvas 15puzzle Game</a>' +
          '<a href="/GAMES/JS_Canvas_2048/index.html">Canvas 2048 Game</a>' +
          '<a href="/GAMES/JS_Canvas_MineSweeper/index.html">Canvas MineSweeper Game</a>' +
          '<a href="/GAMES/JS_Canvas_Rays/index.html" class="doNotShowInMobile">Canvas Rays Game</a>' +
          '<a href="/GAMES/JS_Canvas_Snake/index.html">Canvas Snake Game</a>' +
          '<a href="/GAMES/JS_Canvas_TikTakToe/index.html">Canvas TikTakToe Game</a>' +
          '<a href="/GAMES/JS_snake/index.html" class="doNotShowInMobile">Snake Game (div)</a>' +
          '<a href="/GAMES/JS_TikTakToe/index.html" class="doNotShowInMobile">TikTakToe Game (div)</a>' +
        '</div>' +
      '</div>' +
      '<div class="dropdown"><a href="/kubs/kubs.html" class="dropbtn">Ka-salikt-rubika-kubu?</a></div>' +
      '<div class="dropdown"><a href="/about/about.html" class="dropbtn">About</a></div>' +
    '</div>' +
  '</div>';

  var placeholder = document.getElementById('replace_with_navbar');
  if (placeholder) {
    var div = document.createElement('div');
    div.innerHTML = navHTML;
    placeholder.parentNode.replaceChild(div, placeholder);
  }

  // Mobile Menu Toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }

  // Dropdown Toggle for Mobile
  document.querySelectorAll('.dropdown .dropbtn').forEach(function(button) {
    button.addEventListener('click', function() {
      this.parentElement.classList.toggle('active');
    });
  });
})();
