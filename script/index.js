var SIGNATURE_SERVER = "https://font-memorygame.herokuapp.com/sign";
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

    // $('#rainkingtop').addClass('hide');
    $(".content li")
      .eq(index)
      .css("display", "block");
    $("#rainkingtop").removeClass("hide2");
    // $('.swiper-pagination-bullet').css('width', '17px');
    // $('.swiper-pagination-bullet').css('height', '17px');

    //一度タブについているクラスselectを消し、
    $(".tab li").removeClass("select");

    //クリックされたタブのみにクラスselectをつけます。
    $(this).addClass("select");
  });
});

window.onload = function getRanking() {
  const ApplicationKey =
    "dce6e6b709fdc7d434e873941cf8afa2f526d544c86520dc6dd5b9ffb963fe0b";
  const ClientKey = "aaaaaaaaaaa";
  var ncmb = new NCMB(ApplicationKey, ClientKey);
  var highScore = ncmb.DataStore("ProductionScore");
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
          var rankingli = `<tr><td class ='td1'>${rank}</td><td>${rankingName}</td><td>${rankingScore}</td></tr>`;
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
};
$(function() {
  var swiper = new Swiper(".swiper-container", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function(index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    }
  });
});
