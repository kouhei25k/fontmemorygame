// function fontRandom() {

const words1 = [
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
const words2 = [
  "ピーマンの肉詰め",
  "豚の香味焼き",
  "若鶏の唐揚げ",
  "煮込みハンバーグ",
  "牛肉のしぐれ煮",
  "照り焼きチキン",
  "チキン南蛮",
  "豚ロースのソテー",
  "さわらの幽庵焼き",
  "まぐろの漬け丼",
  "だし茶漬け",
  "きのこの雑炊",
  "五目混ぜご飯",
  "ひじきの煮物",
  "サバのみそ煮",
  "アジの南蛮漬け",
  "魚介のパエリア",
  "白身魚のポワレ",
  "あさりの酒蒸し",
  "鯛のカルパッチョ",
  "サケのホイル焼き",
  "洋野菜のマリネ",
  "なすの田楽",
  "根菜のリゾット",
  "塩ラーメン",
  "なめこの味噌汁"
];

var fontsRandomArray = [
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

var fontsMinchoArray = [
  0,
  { fontname: "小塚明朝R", fontcss: "kozuka-mincho-pr6n" },
  { fontname: "平成明朝W3", fontcss: "heisei-mincho-stdn" },
  { fontname: "リュウミン", fontcss: "a-otf-ryumin-pr6n" },
  { fontname: "見出ミンMA31", fontcss: "a-otf-midashi-mi-ma31-pr6n" },
  { fontname: "太ミンA101", fontcss: "a-otf-futo-min-a101-pr6n" },
  { fontname: "秀英明朝M", fontcss: "dnp-shuei-mincho-pr6n" },
  { fontname: "游明朝R", fontcss: "yu-mincho-pr6n" },
  { fontname: "V7明朝M", fontcss: "vdl-v7mincho" },
  { fontname: "貂明朝R", fontcss: "ten-mincho" },
  { fontname: "凸版文久明朝R", fontcss: "toppan-bunkyu-mincho-pr6n" },
  { fontname: "マティスM", fontcss: "fot-matisse-pron" },
  { fontname: "源ノ明朝B", fontcss: "source-han-serif-japanese" },
  { fontname: "りょうDisplayPlus", fontcss: "ryo-display-plusn" },
  { fontname: "TBUD明朝", fontcss: "tbudmincho-std" }
];

var fontsGothicArray = [
  0,
  { fontname: "小塚ゴシック", fontcss: "kozuka-gothic-pr6n" },
  { fontname: "ちび丸ゴシック", fontcss: "tbchibirgothicplusk-pro" },
  { fontname: "ちび丸ゴシック", fontcss: "tbcinergothic-std" },
  { fontname: "見出ゴMB31", fontcss: "a-otf-midashi-go-mb31-pr6n" },
  { fontname: "じゅん", fontcss: " a-otf-jun-pro" },
  { fontname: "セザンヌ", fontcss: "fot-cezanne-pron" },
  { fontname: "ロダン", fontcss: "fot-rodin-pron" },
  { fontname: "スーラ", fontcss: " fot-seurat-pron" },
  { fontname: "筑紫B丸ゴシック", fontcss: "fot-tsukubrdgothic-std" },
  { fontname: "秀英角ゴシック金", fontcss: "dnp-shuei-gothic-kin-std" },
  { fontname: "秀英丸ゴシック", fontcss: "dnp-shuei-mgothic-std" },
  {
    fontname: "凸版文久見出しゴシック",
    fontcss: "toppan-bunkyu-midashi-go-std"
  }
];

var fontsDesignArray = [
  0,
  { fontname: "カリグラゴシックE", fontcss: "tbcgothic-std" },
  { fontname: "ぶらっしゅ", fontcss: "ro-brush-std" },
  { fontname: "漢字タイポス415", fontcss: "kan415typos-std" },
  { fontname: "クレー", fontcss: "fot-klee-pro" },
  { fontname: "アドミーンR", fontcss: "vdl-admin" },
  { fontname: "ギガ丸M", fontcss: "vdl-gigamaru" },
  { fontname: "ロゴjrブラック", fontcss: "vdl-logojrblack" },
  { fontname: "テラＧ", fontcss: "vdl-terag" },
  { fontname: "方縦M500", fontcss: "ta-houdate-m500" },
  { fontname: "ルビー", fontcss: "ta-rb" },
  { fontname: "candy", fontcss: "ta-candy" },
  { fontname: "サン", fontcss: "ro-san-std" }
];

//   return fontsRandomArray;
// }
