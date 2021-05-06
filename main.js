let continents = {
  Asia :
  {
    title : "Asia",
    description : "The easter land of orient and exotical culture",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/92/1_li_jiang_guilin_yangshuo_2011.jpg"
  },
  Europe :
  {
    title : "Europe",
    description : "The root of western civilization and the most diverse continent",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/The_Parthenon_in_Athens.jpg"
  },
  Africa :
  {
    title : "Africa",
    description : "The warmest and least populous continent",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/All_Gizah_Pyramids.jpg"
  },
  Australia :
  {
    title : "Australia",
    description : "The smallest of the world's continents. It is also the lowest, the flattest and (apart from Antarctica) the driest",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/SimpsonsDesert.JPG"
  },
  America :
  {
    title : "North America",
    description : "The wealthiest continent and the most liberal politically",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg"
  },
  LatinAmerica :
  {
    title : "Latin America",
    description : "The continent of diversity and exotic landscape",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Cancun_aerial_photo_by_safa.jpg"
  },
  Greenland :
  {
    title : "Greenland",
    description : "The world's biggest island belonging to Denmark",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Tasiilaq_-_Greenland_summer_2009.jpg"
  }
}

var body = document.getElementsByTagName("BODY")[0];
var counter = document.getElementById("counter");
var theMap = document.querySelector("map");
var allContinents = theMap.querySelectorAll("area");
var continentInfo = document.getElementById("continentInfo");
var count = 0;
var arr = [];
var rect;

theMap.addEventListener("click", eventHandler, false);

function eventHandler(e) {
  e.preventDefault();
  if (e.target != e.currentTarget) {
    var continent = e.target;
    var continentNames = Object.keys(continents);
    for (var i=0; i < allContinents.length; i++) {
        if (continent.getAttribute("alt") == (continentNames[i])) {
          continentInfo.innerHTML = "";
          continentInfo.insertAdjacentHTML("afterbegin", "<a id='close'>×</a> <img src='" + continents[continentNames[i]].image +"'><h1>"+ continents[continentNames[i]].title +"</h1><p>"+ continents[continentNames[i]].description +"</p>");
          continentInfo.classList.add("show");
          if(screen.width >= 720) {
            rect = e.target.getBoundingClientRect();
            var x, y;

            var distanceTop = 0, distanceBottom = 0;
            rect2 = continentInfo.getBoundingClientRect();
            if(window.innerHeight - rect2.bottom < 500) {
              distanceBottom = 200;
            }
            if(isPartlyInViewport(continentInfo, 100)) {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top - distanceBottom;
                console.log(y);
            }
            if(rect2.top < 100) {
              distanceTop = 100;
              y = e.clientY - rect.top + distanceTop;
            }
            else{
                distanceBottom = 200;
                x = e.clientX - rect.left;
                y = e.clientY - distanceBottom;
                console.log(y);
            }
          }
          continentInfo.style.left = x +'px';
          continentInfo.style.top = y +'px';
          }
          var close = document.getElementById("close");
          close.addEventListener('click', (e) => {
            continentInfo.classList.remove('show');
          });
          counter.innerHTML = "";
          var data = continent.getAttribute("alt");
          console.log(data);
          arr.push(data);
          var unique = arr.filter(onlyUnique);
          count = unique.length;
          if(count < 7)
            counter.insertAdjacentHTML("afterbegin", "<p> You clicked on "  + count + " point of interests</p>");
          else {
            counter.insertAdjacentHTML("afterbegin", "<p> You have clicked on all of "  + count + " continents</p>");
            setTimeout(function(){$('#counter').fadeOut();}, 9000);
          }
          if(e.target != e.currentTarget) {
            counter.style.display = 'block';
            setTimeout(function(){$('#counter').fadeOut();}, 4000);
          }
        }
    }
  e.stopPropagation();
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function isPartlyInViewport(el, percentVisible) {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};

window.onload = function () {
    var ImageMap = function (map, img) {
            var n,
                areas = map.getElementsByTagName('area'),
                len = areas.length,
                coords = [],
                previousWidth = 1238.660;
            for (n = 0; n < len; n++) {
                coords[n] = areas[n].coords.split(',');
            }
            this.resize = function () {
                var n, m, clen,
                    x = img.offsetWidth / previousWidth;
                for (n = 0; n < len; n++) {
                    clen = coords[n].length;
                    for (m = 0; m < clen; m++) {
                        coords[n][m] *= x;
                    }
                    areas[n].coords = coords[n].join(',');
                }
                previousWidth = document.body.clientWidth;
                return true;
            };
            window.onresize = this.resize;
        },
        imageMap = new ImageMap(document.getElementById('theMap'), document.getElementById('map'));
    imageMap.resize();
    return;
}

window.addEventListener('resize', function () {
    "use strict";
    window.location.reload();
});


