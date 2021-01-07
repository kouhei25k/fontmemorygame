var SIGNATURE_SERVER = "https://font-memorygame.herokuapp.com/sign";
const ApplicationKey =
  "dce6e6b709fdc7d434e873941cf8afa2f526d544c86520dc6dd5b9ffb963fe0b";
const ClientKey = "aaaaaaaaaaa";
var ncmb = new NCMB(ApplicationKey, ClientKey);
var highScore = ncmb.DataStore("HighScore");

window.addEventListener("DOMContentLoaded", function() {
  var setPlayerName = localStorage.getItem("PlayerName");
  localStorage.setItem("GameMode", 0);
  document.getElementById("IdPlayerName").value = setPlayerName;
});

var mySwiper = new Swiper(".swiper-gamemode", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  loop: true,
  on: {
    slideChange: function() {
      console.log(mySwiper.realIndex);
      if (mySwiper.realIndex == 0) {
        highScore = ncmb.DataStore("HighScore");
        changeGamemodeColor("","","");
        getRanking();
        localStorage.setItem("GameMode", 0);
      } else if (mySwiper.realIndex == 1) {
        highScore = ncmb.DataStore("MinchoScore");
        changeGamemodeColor("color-baw","bgc-block","color-baw2");
        getRanking();
        localStorage.setItem("GameMode", 1);
      } else if (mySwiper.realIndex == 2) {
        highScore = ncmb.DataStore("DesignScore");
        localStorage.setItem("GameMode", 2);
        changeGamemodeColor("color-white","bgc-gra","bac-white");
        getRanking();
      } else if (mySwiper.realIndex == 3) {
        highScore = ncmb.DataStore("GothicScore");
        localStorage.setItem("GameMode", 3);
        changeGamemodeColor("color-white","bacGothic","bac-white")
        getRanking();
      }
    }
  }
});

function changeGamemodeColor(tc,bgc,sbgc){
  var color = "#color,#IdPlayerName,#startButton,#openModal";
  $(color).removeClass("color-baw color-white");
  $("body").removeClass("bgc-block bgc-gra bacGothic");
  $("#toplefticon").removeClass("color-baw2 bac-white");
  $(color).addClass(tc);
  $("body").addClass(bgc);
  $("#toplefticon").addClass(sbgc);
  
  }



(function() {
  const modalArea = document.getElementById("modalArea");
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const modalBg = document.getElementById("modalBg");
  const toggle = [openModal, closeModal, modalBg];

  for (let i = 0, len = toggle.length; i < len; i++) {
    toggle[i].addEventListener(
      "click",
      function() {
        modalArea.classList.toggle("is-show");
      },
      false
    );
  }
})();

$(function() {
  //クリックしたときのファンクションをまとめて指定
  $(".tab li").click(function() {
    //.index()を使いクリックされたタブが何番目かを調べ、
    //indexという変数に代入します。
    var index = $(".tab li").index(this);
    //コンテンツを一度すべて非表示にし、
    $(".content li").css("display", "none");
    //クリックされたタブと同じ順番のコンテンツを表示します。
    $(".content li")
      .eq(index)
      .css("display", "block");
    $("#rainkingtop").removeClass("hide2");
    //一度タブについているクラスselectを消し、
    $(".tab li").removeClass("select");
    //クリックされたタブのみにクラスselectをつけます。
    $(this).addClass("select");
  });
});

function getRanking() {
  $(".ranking").empty();
  var storageGameMode = localStorage.getItem("GameMode");
  switch (storageGameMode) {
    case 0:
      highScore = ncmb.DataStore("HighScore");
      console.log("ランダムだよー");
      break;
    case 1:
      highScore = ncmb.DataStore("MinchoScore");
      console.log("明朝だよー");
      break;
    case 2:
      highScore = ncmb.DataStore("DesignScore");
      console.log("デザインだよー");
      break;
  }
  highScore
    .order("score")
    .order("name")
    .limit(100)
    .fetchAll()
    .then(function(results) {
      //ランキング取得後の処理
      if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          var ranking = results[i];
          var rank = i + 1;
          var rankingScore = ranking.score;
          var rankingName = ranking.name;
          var number = Math.floor(i / 10) + 1;
          var rankingNumber = "ranking" + number;
          var UlRanking = document.getElementById(rankingNumber);
          var rankingli = `<tr><td class ='td1'>${rank}</td><td class ='td2'>${rankingName}</td><td>${rankingScore}</td></tr>`;
          UlRanking.insertAdjacentHTML("beforeend", rankingli);
          // console.log(rank + ": " + rankingName + "-" + rankingScore);
          // console.log(number)
          // console.log(rankingNumber)
        }
      } else {
        console.log("スコアデータがありません");
      }
    })
    .catch(function(err) {
      //エラー時の処理
      console.log(err);
    });
}
getRanking();

//swiper

$(function() {
  var swiper = new Swiper(".swiper-ranking", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function(index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    }
  });
});

// });

// function changeMincho() {
//   var color = "#color,#IdPlayerName,#startButton,#openModal";
//   $(color).addClass("color-baw");
//   $("body").addClass("bgc-block");
//   $("#toplefticon").addClass("color-baw2");
//   $(color).removeClass("color-white");
//   $("body").removeClass("bgc-gra");
//   $("#toplefticon").removeClass("bac-white");
// }
// function changeGameMode() {
//   var color = "#color,#IdPlayerName,#startButton,#openModal";
//   $(color).removeClass("color-baw");
//   $("body").removeClass("bgc-block");
//   $("#toplefticon").removeClass("color-baw2");
//   $(color).removeClass("color-white");
//   $("body").removeClass("bgc-gra");
//   $("#toplefticon").removeClass("bac-white");
// }
// function changeDesign() {
//   var color = "#color,#IdPlayerName,#startButton,#openModal";
//   $(color).addClass("color-white");
//   $("body").addClass("bgc-gra");
//   $("#toplefticon").addClass("bac-white");
//   $(color).removeClass("color-baw");
//   $("body").removeClass("bgc-block");
//   $("#toplefticon").removeClass("color-baw2");
// }
