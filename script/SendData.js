
    var url = window.location.href;
    var fileName = url.split('/').pop();
    
   /* if(fileName == "index.html"){
        var PlayerName = document.getElementById("IdPlayerName").value;
    }*/
function SetName (){
    var PlayerName = document.getElementById("IdPlayerName").value;
    if(PlayerName != ""){
        var title = document.title;
        if(title == "フォント神経衰弱WEB TOP"){
        location.href = "game.html?name=" + encodeURIComponent(PlayerName);
        }
        
    }else{
       alert("名前を入力してください");
    }
   
}