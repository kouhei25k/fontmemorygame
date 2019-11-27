var SIGNATURE_SERVER = "https://font-memorygame.herokuapp.com/sign";
(function() {
  "use strict";

  const words = [
    "ピーマンの肉詰め",
    "豚の生姜焼き",
    "若鶏の唐揚げ",
    "煮込みハンバーグ",
    "牛肉のしぐれ煮",
    "照り焼きチキン",
    "チキン南蛮",
    "豚ロースのソテー",
    "さわらの幽庵焼き",
    "まぐろの漬け丼",
    "鯛のだし茶漬け",
    "きのこの雑炊",
    "松茸の混ぜご飯",
    "ひじきの煮物",
    "サバの味噌煮",
    "アジの南蛮漬け",
    "魚介のパエリア",
    "白身魚のポワレ",
    "あさりの酒蒸し",
    "蛸のカルパッチョ",
    "鮭のホイル焼き",
    "洋野菜のマリネ",
    "なすの田楽",
    "根菜のリゾット",
    "醤油ラーメン",
    "なめこの味噌汁"
  ];

  const fonts = [
    0,
    { fontname: "マティスM", fontcss: "fot-matisse-pron" },
    { fontname: "源ノ明朝B", fontcss: "source-han-serif-japanese" },
    { fontname: "中ゴシックBBB", fontcss: "a-otf-gothic-bbb-pr6n" },
    { fontname: "見出しゴMB31", fontcss: "a-otf-midashi-go-mb31-pr6n" },
    { fontname: "筑紫A丸ゴシックR", fontcss: "fot-tsukuardgothic-std" },
    { fontname: "シネマ丸ゴシックM", fontcss: "tbcinergothic-std" },
    { fontname: "ペンジェントルB", fontcss: "vdl-pengentle" },
    { fontname: "漢字タイポス415", fontcss: "kan415typos-std" },
    { fontname: "ぶらっしゅ", fontcss: "ro-brush-std" },
    { fontname: "ロゴjrブラック", fontcss: "vdl-logojrblack" },
    { fontname: "ラインG", fontcss: "vdl-lineg" },
    { fontname: "方眼K500", fontcss: "ta-hougan-k500" }
  ];
  //カードの枚数
  var pairs = 12;
  var sheet = pairs * 2;
  var cards = [];

  //カード
  var font;
  var typeNumber = [];
  //カードめくり変数宣言
  var flipCount = 0;
  var firstCard = null;
  var secondCard = null;
  //タイマー
  var time;
  var penaltyTime = 0;
  var startTime;
  var isRunning = false;
  var correctCount = 0;
  var timeoutId;
  //カードの生成
  function init() {
    var i;
    var card;
    arrShuffle(words);
    for (i = 1; i <= sheet; i++) {
      typeNumber.push(i);
      cards.push(createCard(words[i]));
      // fontSet();
    }
    while (cards.length) {
      card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
      document.getElementById("stage").appendChild(card);
    }
  }

  //カードの追加

  function createCard(words) {
    var container;
    var card;
    var inner;
    var typeNumberLen = typeNumber[typeNumber.length - 1];
    fontSet();

    inner = `<div class="card-front type-number${typeNumberLen}">${font}</div><div class="card-back type-number${typeNumberLen}">${words}</div>`;
    card = document.createElement("div");
    card.innerHTML = inner;
    card.className = "card";
    card.addEventListener("click", function() {
      flipCard(this);
      if (isRunning === true) {
        return;
      }
      isRunning = true;
      //runTimer(); //スタートモーダルに移動
      document.getElementById("restart").className = "";
    });
    container = document.createElement("div");
    container.className = "card-container";
    container.appendChild(card);

    return container;
  }

  //めくり&めくり制限
  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      return;
    }
    if (card.className.indexOf("open") !== -1) {
      return;
    }
    card.className = "card open";
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      secondCard.addEventListener("transitionend", check);
    }
  }
  //正誤判定
  function check() {
    if (
      firstCard.children[0].textContent !== secondCard.children[0].textContent
    ) {
      firstCard.className = "card";
      secondCard.className = "card";
      penaltyTime = penaltyTime + 3;
      document.getElementById("score").classList.add("buruburu");
      $(".buruburu").on("webkitAnimationEnd", function() {
        $("#score").removeClass("buruburu");
      });
    } else {
      correctCount++;

      if (correctCount === pairs) {
        clearTimeout(timeoutId);

        SendData();
        modal();
      }
    }
    secondCard.removeEventListener("transitionend", check);
    firstCard = null;
    secondCard = null;
  }
  //タイマー
  function runTimer() {
    time = ((Date.now() - startTime) / 1000 + penaltyTime).toFixed(2);
    document.getElementById("score").textContent = time;
    timeoutId = setTimeout(function() {
      runTimer();
    }, 10);
  }
  // fontセット

  function fontSet() {
    for (var i = 1; i <= sheet; i++) {
      let halfi = Math.ceil(i / 2);
      let typenumberi = ".type-number" + i;
      var fontscss;
      switch (typeNumber.length) {
        case i:
          font = fonts[halfi]["fontname"];
          fontscss = fonts[halfi]["fontcss"];
          // console.log(i)
          // console.log(typenumberi)
          // console.log(font)
          // console.log(fontscss)

          $(function() {
            $(typenumberi).css("font-family", fontscss);
          });
          break;
      }
    }
  }

  //シャッフル
  function arrShuffle(words) {
    // ここに#buttonをクリックしたら発生させる処理を記述する
    var len = words.length;
    while (len > 0) {
      var rnd = Math.floor(Math.random() * len);
      var tmp = words[len - 1];
      words[len - 1] = words[rnd];
      words[rnd] = tmp;
      len -= 1;
    }
  }
  //modal
  function modal() {
    var myScore = document.getElementById("score").textContent;
    document.getElementById("scoreResult").innerHTML = myScore;
    var btn = document.getElementById("btn");
    var modal = document.getElementById("modal");
    modal.classList.add("is-show");
    var closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", function() {
      modal.classList.remove("is-show");
    });
  }

  window.onload = function modal2() {
    var btn = document.getElementById("btn");
    var modal2 = document.getElementById("modal2");
    modal2.style.display = "block";
    var blur = document.getElementById("gamearea");
    var startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", function() {
      modal2.style.display = "none";
      blur.classList.toggle("gamearea");
      startTime = Date.now();
      runTimer(); //タイマースタート
    });
  };
  //send date to DB
  function SendData() {
    var urlPN = location.search.split("=").pop();
    var PlayerName = decodeURIComponent(urlPN);
    var myScore = document.getElementById("score").textContent;

    const ApplicationKey =
      "dce6e6b709fdc7d434e873941cf8afa2f526d544c86520dc6dd5b9ffb963fe0b";
    const ClientKey = "dummy";
    var ncmb = new NCMB(ApplicationKey, ClientKey);
    var ScoreClass = ncmb.DataStore("ProductionScore");
    var score = new ScoreClass();
    score
      .set("name", PlayerName)
      .set("score", Number(myScore))
      .save()
      .then(function(score) {
        //alert(PlayerName);
        ScoreClass.lessThan("score", Number(myScore))
          .count() // 件数を結果に含める
          .fetchAll()
          .then(function(scores) {
            tweet();
            var rank =
              scores.count !== undefined ? parseInt(scores.count) + 1 : 1;
            var ModalPlayerRank = document.getElementById("ModalPlayerRank");
            ModalPlayerRank.innerHTML = rank;
          });

        var ModalPlayerName = document.getElementById("ModalPlayerName");
        ModalPlayerName.innerHTML = PlayerName;

        if (myScore < 15) {
          var level = "【フォント達人級】";
          var levelExplanation =
            "すでに達人の域に達しています。<br>もう見上げるものは何もありません。";
        } else if (myScore < 20) {
          level = "【フォントプロ級】";
          levelExplanation = "素晴らしい！<br>文句なしのプロ級です。";
        } else if (myScore < 25) {
          level = "【フォント上級者級】";
          levelExplanation =
            "かなりの実力をお持ちですね。<br>更なる高みを目指しましょう。";
        } else if (myScore < 40) {
          level = "【フォント中級者級】";
          levelExplanation =
            "そこそこの力を持っています。<br>まだまだ伸びしろがありますよ。";
        } else if (myScore < 60) {
          level = "【フォント初心者級】";
          levelExplanation =
            "太字のフォントや変わった形の<br>フォントから見つけるのがコツです。";
        } else {
          level = "【フォント新人級】";
          levelExplanation =
            "ゆっくりと見比べて見てください。<br>色々な違いを見つけられるはずです";
        }

        var Modallevel = document.getElementById("ModalLevel");
        Modallevel.innerHTML = level;
        var ModalExplanation = document.getElementById("ModalExplanation");
        ModalExplanation.innerHTML = levelExplanation;

        function tweet() {
          // var level = "フォント達人級";
          var tweetPnMs = `&text=${PlayerName}さんは${level}！%0aタイム：${myScore}`;
          var tweethrefurl =
            " href=http://twitter.com/share?url=https://www.play-font.com"; 
          var rel = ` rel="noopener noreferrer"`;
          var tweetContents = `<a class="tweetbotton"${tweethrefurl}${tweetPnMs}%0aフォント神経衰弱WEB%0a&hashtags=フォント神経衰弱WEB${rel}>結果を共有</a>`;
          var tweethtml = document.getElementById("tweetbotton");
          console.log(tweetContents);
          tweethtml.innerHTML = tweetContents;
        }

        function getRanking() {
          const ApplicationKey =
            "dce6e6b709fdc7d434e873941cf8afa2f526d544c86520dc6dd5b9ffb963fe0b";
          const ClientKey = "aaaaaa";
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
                  var rankingScore = ranking.score;
                  var rankingName = ranking.name;
                  var number = Math.floor(i / 10) + 1;
                  var rankingNumber = `ranking${number}`;
                  var UlRanking = document.getElementById(rankingNumber);
                  var rankingli = `<tr><td class ='td1'>${rank}</td><td class ='td2'>${rankingName}</td><td>${rankingScore}</td></tr>`;
                  UlRanking.insertAdjacentHTML("beforeend", rankingli);

                  //console.log(`${rank} : ${rankingName} - ${rankingScore}`);
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
      });
  }
  init();

  $(".swiper-pagination-bullet").css("width", "17px");
  $(".swiper-pagination-bullet").css("height", "17px");
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
})();
