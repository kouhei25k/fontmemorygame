var SIGNATURE_SERVER = "https://font-memorygame.herokuapp.com/sign";

(function() {
  "use strict";
  const ApplicationKey =
    "dce6e6b709fdc7d434e873941cf8afa2f526d544c86520dc6dd5b9ffb963fe0b";
  const ClientKey = "aaaaaa";
  var ncmb = new NCMB(ApplicationKey, ClientKey);
  // var highScore = ncmb.DataStore();

  // const words = [
  //   "ピーマンの肉詰め",
  //   "豚の生姜焼き",
  //   "若鶏の唐揚げ",
  //   "煮込みハンバーグ",
  //   "牛肉のしぐれ煮",
  //   "照り焼きチキン",
  //   "チキン南蛮",
  //   "豚ロースのソテー",
  //   "さわらの幽庵焼き",
  //   "まぐろの漬け丼",
  //   "鯛のだし茶漬け",
  //   "きのこの雑炊",
  //   "松茸の混ぜご飯",
  //   "ひじきの煮物",
  //   "サバの味噌煮",
  //   "アジの南蛮漬け",
  //   "魚介のパエリア",
  //   "白身魚のポワレ",
  //   "あさりの酒蒸し",
  //   "蛸のカルパッチョ",
  //   "鮭のホイル焼き",
  //   "洋野菜のマリネ",
  //   "なすの田楽",
  //   "根菜のリゾット",
  //   "醤油ラーメン",
  //   "なめこの味噌汁"
  // ];

  var fonts;
  var fontkitId;
  var storagegamemode = localStorage.getItem("GameMode");

  if (storagegamemode == 0) {
    fontkitId = "bpz7hqo";
    fonts = fontsRandomArray;
    var highScore = ncmb.DataStore("HighScore");
    // GameScore = "HighScore";
  } else if (storagegamemode == 1) {
    fontkitId = "wek3vws";
    fonts = fontsMinchoArray;
    var highScore = ncmb.DataStore("MinchoScore");
    // GameScore = "MinchoScore";
  } else if (storagegamemode == 2) {
    fontkitId = "uzk0jbi";
    fonts = fontsDesignArray;
    // GameScore = "DesignScore";
    var highScore = ncmb.DataStore("DesignScore");
  }

  (function(d) {
    var config = {
        kitId: fontkitId,
        scriptTimeout: 3000,
        async: true
      },
      h = d.documentElement,
      t = setTimeout(function() {
        h.className =
          h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
      }, config.scriptTimeout),
      tk = d.createElement("script"),
      f = false,
      s = d.getElementsByTagName("script")[0],
      a;
    h.className += " wf-loading";
    tk.src = "https://use.typekit.net/" + config.kitId + ".js";
    tk.async = true;
    tk.onload = tk.onreadystatechange = function() {
      a = this.readyState;
      if (f || (a && a != "complete" && a != "loaded")) return;
      f = true;
      clearTimeout(t);
      try {
        Typekit.load(config);
      } catch (e) {}
    };
    s.parentNode.insertBefore(tk, s);
  })(document);

  // const fonts = fontsMinchoArray;
  // var fontRandom = fontRandom();
  console.log(fonts);

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

  //スタートモーダル
  window.addEventListener("DOMContentLoaded", function modal2() {
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
  });

  //usrIDを生成
  function RondamString() {
    var l = 8;
    // 生成する文字列に含める文字セット
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var userId = "";
    for (var i = 0; i < l; i++) {
      userId += c[Math.floor(Math.random() * cl)];
    }
    return userId;
  }
  var userId = RondamString();

  //send date to DB
  function SendData() {
    var urlPN = location.search.split("=").pop();
    var PlayerName = decodeURIComponent(urlPN);
    var myScore = Number(document.getElementById("score").textContent);
    var storageUserId = localStorage.getItem("UserId");
    var storagePlayerName = localStorage.getItem("PlayerName");

    //今回のランキング取得
    function getMySocer() {
      //今回のスコア
      (function() {
        highScore
          .lessThan("score", myScore)
          .count() // 件数を結果に含める
          .fetchAll()
          .then(function(scores) {
            var rank =
              scores.count !== undefined ? parseInt(scores.count) + 1 : 1;
            var ModalPlayerRank = document.getElementById("ModalPlayerRank");
            ModalPlayerRank.innerHTML = rank;
          });
      })();
      //最高ランキングを取得
      (function() {
        highScore
          .equalTo("userID", storageUserId)
          .equalTo("name", storagePlayerName)
          .fetchAll()
          .then(function(results) {
            console.log("以前のネームのデータがあります");
            var newhighScore = results[0];
            highScore
              .lessThan("score", Number(newhighScore.score))
              .count() // 件数を結果に含める
              .fetchAll()
              .then(function(scores) {
                //順位
                var rank =
                  scores.count !== undefined ? parseInt(scores.count) + 1 : 1;
                var ModalBestPlayerRank = document.getElementById(
                  "ModalBestPlayerRank"
                );
                ModalBestPlayerRank.innerHTML = rank;
                //タイム
                var BestMytime = document.getElementById("ModalBestscore");
                BestMytime.innerHTML = Number(newhighScore.score);
              });
          });
      })();

      (function getRanking() {
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
              }
            } else {
              console.log("スコアデータがありません");
            }
          })
          .catch(function(err) {
            //エラー時の処理
            console.log(err);
          });
      })();
    }

    if (!storageUserId) {
      //stirageにuserIDがない場合(初回)
      console.log("初回プレイです");
      var newscore = new highScore();
      newscore
        .set("name", PlayerName)
        .set("score", Number(myScore))
        .set("userID", userId)
        .save()
        .then(function(score) {
          localStorage.setItem("UserId", userId);
          getMySocer();
        });
    } else {
      //stirageにuserIDが存在(2回目以降)
      console.log("2回目以降です");
      console.log(storageUserId);
      console.log(storagePlayerName);
      highScore
        .equalTo("userID", storageUserId)
        .equalTo("name", storagePlayerName)
        .fetchAll()
        .then(function(results) {
          if (results.length > 0) {
            //同じ名前のデータがある
            console.log("以前のネームのデータがあります");
            var newhighScore = results[0];
            console.log(newhighScore.score);
            console.log(myScore);
            //最高スコアか判定
            if (myScore < Number(newhighScore.score)) {
              newhighScore
                .set("score", myScore)
                .update()
                .then(function(results) {
                  console.log("データを上書きしました");
                  getMySocer();
                });
            } else {
              console.log("最高スコアではありません");
              getMySocer();
            }
          } else {
            //同じ名前のデータがない→新規登録
            console.log("以前のネームのデータがありません");
            var newscore = new highScore();
            newscore
              .set("name", PlayerName)
              .set("score", Number(myScore))
              .set("userID", storageUserId)
              .save()
              .then(function(score) {
                getMySocer();
              });
          }
          console.log("検索成功");
        })
        .catch(function(err) {
          console(err);
        });
    }

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
        "href=http://twitter.com/share?url=https://www.play-font.com";
      var rel = `rel="noopener noreferrer"`;
      var tweetContents = `<a class="tweetbotton"${tweethrefurl}${tweetPnMs}%0aフォント神経衰弱WEB%0a&hashtags=フォント神経衰弱WEB${rel}>結果を共有</a>`;
      var tweethtml = document.getElementById("tweetbotton");
      // console.log(tweetContents);
      tweethtml.innerHTML = tweetContents;
    }

    tweet();
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
