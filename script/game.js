(function() {
    'use strict';


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
        "なめこの味噌汁",
    ]

    const fonts = [0,
            "マティス M",
            "源ノ明朝 B",
            "中ゴシックBBB",
            "見出しゴMB31",
            "筑紫A丸ゴシック R",
            "シネマ丸ゴシック M",
            "ペンジェントル B",
            "漢字タイポス415",
            "ぶらっしゅ",
            "ロゴjrブラック",
            "ラインG",
            "方眼K500",

        ]
        //カードの枚数
    var pairs = 1;
    var sheet = pairs * 2
    var cards = [];

    //カード
    var font
    var typeNumber = []
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
            //cards.push(createCard(words[i]));

            //document.getElementById('stage').appendChild(createCard(i));
            //document.getElementById('stage').appendChild(createCard(i));
        }
        while (cards.length) {
            card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
            document.getElementById('stage').appendChild(card);

        }
    }

    //カードの追加

    function createCard(words) {
        var container;
        var card;
        var inner;
        var typeNumberLen = typeNumber[typeNumber.length - 1];

        fontSet();
        inner = '<div class="card-front type-number' + typeNumberLen + '">' + font +
            '</div><div class="card-back type-number' + typeNumberLen + '">' + words + '</div>';
        card = document.createElement('div');
        card.innerHTML = inner;
        card.className = 'card';
        card.addEventListener('click', function() {
            flipCard(this);
            if (isRunning === true) {
                return;
            }
            isRunning = true;
            //startTime = Date.now();
            //runTimer(); //スタートモーダルに移動
            document.getElementById('restart').className = '';
        });
        container = document.createElement('div');
        container.className = 'card-container';
        container.appendChild(card);
        return container;
    }

    //めくり&めくり制限
    function flipCard(card) {
        if (firstCard !== null && secondCard !== null) {
            return;
        }
        if (card.className.indexOf('open') !== -1) {
            return;
        }
        card.className = 'card open';
        flipCount++;
        if (flipCount % 2 === 1) {
            firstCard = card;
        } else {
            secondCard = card;
            secondCard.addEventListener('transitionend', check);

        }
    }
    //正誤判定
    function check() {
        if (
            firstCard.children[0].textContent !==
            secondCard.children[0].textContent
        ) {
            firstCard.className = 'card';
            secondCard.className = 'card';
            penaltyTime = penaltyTime + 3;
            document.getElementById("score").classList.add("buruburu");
            $(".buruburu").on('webkitAnimationEnd', function() { $("#score").removeClass("buruburu"); });

        } else {
            correctCount++;

            if (correctCount === pairs) {
                clearTimeout(timeoutId);
                SendData()
                modal();

            }
        }
        secondCard.removeEventListener('transitionend', check);
        firstCard = null;
        secondCard = null;
    }
    //タイマー
    function runTimer() {

        time = ((Date.now() - startTime) / 1000 + penaltyTime).toFixed(2);
        document.getElementById('score').textContent = time;
        timeoutId = setTimeout(function() {
            runTimer();
        }, 10);
    }
    //fontセット
    function fontSet() {
        switch (typeNumber.length) {
            case 1 || 2:
                font = fonts[1];
                break;

            case 3 || 4:
                font = fonts[2];
                break;
            case 5 || 6:
                font = fonts[3];
                break;
            case 7 || 8:
                font = fonts[4];
                break;
            case 9 || 10:
                font = fonts[5];
                break;
            case 11 || 12:
                font = fonts[6];
                break;
            case 13 || 14:
                font = fonts[7];
                break;
            case 15 || 16:
                font = fonts[8];
                break;
            case 17 || 18:
                font = fonts[9];
                break;
            case 19 || 20:
                font = fonts[10];
                break;
            case 21 || 22:
                font = fonts[11];
                break;
            case 23 || 24:
                font = fonts[12];
                break;


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
        var btn = document.getElementById('btn');
        var modal = document.getElementById('modal');
        //modal.style.display = 'block';
        modal.classList.add('is-show');

        var closeBtn = document.getElementById('closeBtn');
        closeBtn.addEventListener('click', function() {
            // modal.style.display = 'none';
            modal.classList.remove('is-show');
        })
    }



    window.onload = function modal2() {
            var btn = document.getElementById('btn');
            var modal2 = document.getElementById('modal2');
            modal2.style.display = 'block';

            var startBtn = document.getElementById('startBtn');
            startBtn.addEventListener('click', function() {
                modal2.style.display = 'none';
                startTime = Date.now();
                runTimer(); //タイマースタート
            })

        }
        //send date to DB
    function SendData() {
        var urlPN = location.search.split('=').pop();
        var PlayerName = decodeURIComponent(urlPN);
        var myScore = document.getElementById("score").textContent;
        Number(myScore);
        const ApplicationKey = "dce6e6b709fdc7d434e873941cf8afa2f526d544c86520dc6dd5b9ffb963fe0b";
        const ClientKey = "2f6a85ad0e93f1ef98ff6a8c79d927bb7a6fec24cc136516572fbe73abf043c7";
        var ncmb = new NCMB(ApplicationKey, ClientKey);
        var ScoreClass = ncmb.DataStore("HighScore");
        var score = new ScoreClass();
        score.set("name", PlayerName)
            .set("score", Number(myScore))
            .save()
            .then(function(score) {
                //alert(PlayerName);
                ScoreClass.lessThan("score", myScore)
                    .count() // 件数を結果に含める
                    .fetchAll()
                    .then(function(scores) {

                        var rank = (scores.count !== undefined) ? parseInt(scores.count) + 1 : 1;
                        var ModalPlayerRank = document.getElementById("ModalPlayerRank");
                        ModalPlayerRank.innerHTML = rank;
                    })

                var ModalPlayerName = document.getElementById("ModalPlayerName");
                ModalPlayerName.innerHTML = PlayerName;

                function getRanking() {
                    const ApplicationKey = "dce6e6b709fdc7d434e873941cf8afa2f526d544c86520dc6dd5b9ffb963fe0b";
                    const ClientKey = "2f6a85ad0e93f1ef98ff6a8c79d927bb7a6fec24cc136516572fbe73abf043c7";
                    var ncmb = new NCMB(ApplicationKey, ClientKey);
                    var highScore = ncmb.DataStore("HighScore");
                    highScore.order("score").order("name")
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
                                    var rankingNumber = "ranking" + number;
                                    var UlRanking = document.getElementById(rankingNumber);
                                    var rankingli = "<tr><td>" + rank + "</td><td>" + rankingName + "</td><td>" + rankingScore + "</td></tr>";
                                    UlRanking.insertAdjacentHTML('beforeend', rankingli);


                                    console.log(rank + ": " + rankingName + "-" + rankingScore);
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
            })
    }


    init();

}());