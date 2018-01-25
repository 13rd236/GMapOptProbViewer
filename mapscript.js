distances =  [];
points = [];
routeResult = [];
routeRequests = [];
var travelMode　= 0;
var directionsService;
var map;

function initHtml() {
  initMap();
  // dravingText = document.getElementById("travelMode").innerHTML;
  // rootText = document.getElementById("route").innerHTML;

  document.getElementById("travelMode").innerHTML = "<div>TravelMode:DRIVING</div>"
  document.getElementById("array").innerHTML = "<div>通過点:</div>"

  document.getElementById("addBtn").onclick = function() {
    var p = document.getElementById('point').value;
    document.getElementById('point').value = "";
    document.getElementById("array").innerHTML += "<div>" + p + "</div>";
    points.push(p);
  }

  document.getElementById("debackBtn").onclick = function(){
    //points = ["東京","栃木","富山","静岡","名古屋"];
    //points = ["東京","北海道","大阪","埼玉","沖縄"];
    //points = ["東京駅","北海道駅","大阪駅","埼玉駅","群馬駅","山梨駅"];
    //points = ["兵庫","茨城","埼玉","名古屋","三重","石川","千葉","東京","神奈川","群馬","新潟"];
    points = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県",
    "埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
    "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県",
    "岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県",
    "大分県","宮崎県","鹿児島県","沖縄県"];
    // points = ["青森駅","盛岡駅","仙台駅","秋田駅","山形駅","福島駅","水戸駅","宇都宮駅","前橋駅",
    // "さいたま新都心駅","千葉駅","東京駅","横浜駅","新潟駅","富山駅","金沢駅","福井駅","甲府駅","長野駅","岐阜駅",
    // "静岡駅","名古屋駅","津駅","大津駅","京都駅","大阪駅","神戸駅","奈良駅","和歌山駅","鳥取駅","松江駅",
    // "岡山駅","広島駅","山口駅","徳島駅","高松駅","松山駅","高知駅","西鉄福岡駅","佐賀駅","長崎駅","熊本駅",
    // "大分駅","宮崎駅","鹿児島駅","那覇バスターミナル","札幌駅"];
    // points = ["青森駅","盛岡駅","仙台駅","秋田駅","山形駅","福島駅","水戸駅","宇都宮駅","前橋駅",
    // "さいたま新都心駅","千葉駅","東京駅","横浜駅","新潟駅","富山駅","金沢駅","福井駅","甲府駅","長野駅","岐阜駅",
    // "静岡駅","名古屋駅","津駅","大津駅","京都駅","大阪駅","神戸駅","奈良駅","和歌山駅","鳥取駅","松江駅",
    // "岡山駅","広島駅","山口駅","徳島駅","高松駅","松山駅","高知駅","福岡駅","佐賀駅","長崎駅","熊本駅",
    // "大分駅","宮崎駅","鹿児島駅"];

    //points = ["ロサンゼルス駅","ニューヨーク駅","シカゴ駅","ヒューストン駅","サンディエゴ駅"];

    for(i=0;i<points.length;i++){
      document.getElementById("array").innerHTML += "<div>" + points[i] + "</div>";
    }
  }

  document.getElementById("carBtn").onclick = function(){
    travelMode = 0;
    document.getElementById("travelMode").innerHTML = "<div>TravelMode:DRIVING</div>";
  }

  document.getElementById("bicyclBtn").onclick = function(){
    travelMode = 1;
    document.getElementById("travelMode").innerHTML = "<div>TravelMode:BICYCL</div>";
  }

  document.getElementById("transitBtn").onclick = function(){
    travelMode = 2;
    document.getElementById("travelMode").innerHTML = "<div>TravelMode:TRANSIT</div>";
  }

  document.getElementById("walkBtn").onclick = function(){
    travelMode = 3;
    document.getElementById("travelMode").innerHTML = "<div>TravelMode:WALKING</div>";
  }
}

function initMap() {
  directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
   //var points = [];

   map = new google.maps.Map(document.getElementById('map'), {
       center: {lat:35.681298, lng: 139.766247},
       zoom: 5,
       mapTypeId: google.maps.MapTypeId.ROADMAP
   });
   directionsRenderer.setMap(map);
   //var distances = [];
   console.log(array);
}

$("#routeBtn").click(function() {
    // 多重送信を防ぐため通信完了までボタンをdisableにする
    var button = $(this);
    button.attr("disabled", true);

    // 各フィールドから値を取得してJSONデータを作成
    var json = {};
    json.travelMode = [];
    json.places = [];
    json.travelMode.push(travelMode);
    for(i = 0 ;i<points.length;i++){
      json.places.push(points[i]);
    }

    // 通信実行
    $.ajax({
        type:"post",                // method = "POST"
        url:"http://localhost:2070",        // POST送信先のURL
        data:JSON.stringify(json),  // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",           // レスポンスをJSONとしてパースする
        success: function(json_data) {   // 200 OK時
            // JSON Arrayの先頭が成功フラグ、失敗の場合2番目がエラーメッセージ
            // if (!json_data[0]) {    // サーバが失敗を返した場合
            //     alert("Transaction error. " + json_data[1]);
            //     return;
            // }
            // 成功時処理
            console.log(json_data);
            // alert(true);
            button.attr("disabled", false);  // ボタンを再び enableにする
            var data = json_data.latLngs;
            var info = json_data.infos;
            //console.log(info);

            //マーカーの準備
            var infoWindow = [];
            var marker = [];
            function markerEvent(i) {
              marker[i].addListener('click', function() { // マーカーをクリックしたとき
                infoWindow[i].open(map, marker[i]); // 吹き出しの表示
              });
            }
            for(i =0;i<json_data.infos.length;i++){
              position = json_data.infos[i].position;
              content = json_data.infos[i].point;
              marker[i] = new google.maps.Marker({ // マーカーの追加
                position: position, // マーカーを立てる位置を指定
                map: map, // マーカーを立てる地図を指定
                icon:{
		                url: 'pin.png',                      //アイコンのURL
		                  scaledSize: new google.maps.Size(15, 15) //サイズ
	                   }
              });
              infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                content: content // 吹き出しに表示する内容
              });
              markerEvent(i);
            }
            // パスを描画します。
            var line = new google.maps.Polyline({
                map: map, // 描画先の地図
                strokeColor: "#2196f3", // 線の色
                //strokeColor:"#000000",
                strokeOpacity: 0.8, // 線の不透明度
                strokeWeight: 6, // 先の太さ
                path: data // 描画するパスデータ
            });
            //
        },
        error: function() {         // HTTPエラー時
            alert("Server Error. Pleasy try again later.");
        },
        complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            button.attr("disabled", false);  // ボタンを再び enableにする
        }
    });
});

$("#tspBtn").click(function() {
    // 多重送信を防ぐため通信完了までボタンをdisableにする
    var button = $(this);
    button.attr("disabled", true);

    // 各フィールドから値を取得してJSONデータを作成
    //var json = {places:[]};
    var json = {};
    json.travelMode = [];
    json.places = [];
    json.travelMode.push(travelMode);
    for(i = 0 ;i<points.length;i++){
      json.places.push(points[i]);
    }

    // 通信実行
    $.ajax({
        type:"post",                // method = "POST"
        url:"http://localhost:2070/tsp",        // POST送信先のURL
        data:JSON.stringify(json),  // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",           // レスポンスをJSONとしてパースする
        success: function(json_data) {   // 200 OK時
            // JSON Arrayの先頭が成功フラグ、失敗の場合2番目がエラーメッセージ
            // if (!json_data[0]) {    // サーバが失敗を返した場合
            //     alert("Transaction error. " + json_data[1]);
            //     return;
            // }
            // 成功時処理
            console.log(json_data);
            button.attr("disabled", false);  // ボタンを再び enableにする
            var data = json_data.latLngs;
            var info = json_data.infos;
            var route = json_data.route;
            //マーカーの準備
            var infoWindow = [];
            var marker = [];
            function markerEvent(i) {
              marker[i].addListener('click', function() { // マーカーをクリックしたとき
                infoWindow[i].open(map, marker[i]); // 吹き出しの表示
              });
            }
            for(i =0;i<json_data.infos.length;i++){
              position = json_data.infos[i].position;
              content = json_data.infos[i].point;
              marker[i] = new google.maps.Marker({ // マーカーの追加
                position: position, // マーカーを立てる位置を指定
                map: map, // マーカーを立てる地図を指定
                icon:{
		                url: 'pin.png',                      //アイコンのURL
		                  scaledSize: new google.maps.Size(15, 15) //サイズ
	                   }
              });
              infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                content: content // 吹き出しに表示する内容
              });
              markerEvent(i);
            }
            // パスを描画します。
            var line = new google.maps.Polyline({
                map: map, // 描画先の地図
                strokeColor: "#2196f3", // 線の色
                //strokeColor:"#000000",
                strokeOpacity: 0.8, // 線の不透明度
                strokeWeight: 6, // 先の太さ
                path: data // 描画するパスデータ
            });
            document.getElementById("route").innerHTML = "<div>Route</div>"
            for(i=0;i<route.length;i++){
              document.getElementById("route").innerHTML +=  "<div>"+route[i]+"</div>"
              document.getElementById("route").innerHTML +=  "<div>⇩</div>"
            }
            document.getElementById("route").innerHTML +=  "<div>"+route[0]+"</div>"

        },
        error: function() {         // HTTPエラー時
            alert("Server Error. Pleasy try again later.");
        },
        complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            button.attr("disabled", false);  // ボタンを再び enableにする
        }
    });
});

$("#tdpBtn").click(function() {
    // 多重送信を防ぐため通信完了までボタンをdisableにする
    var button = $(this);
    button.attr("disabled", true);

    // 各フィールドから値を取得してJSONデータを作成
    //var json = {places:[]};
    var json = {};
    json.travelMode = [];
    json.places = [];
    json.travelMode.push(travelMode);
    for(i = 0 ;i<points.length;i++){
      json.places.push(points[i]);
    }

    // 通信実行
    $.ajax({
        type:"post",                // method = "POST"
        url:"http://localhost:2070/tdp",        // POST送信先のURL
        data:JSON.stringify(json),  // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",           // レスポンスをJSONとしてパースする
        success: function(json_data) {   // 200 OK時
            // JSON Arrayの先頭が成功フラグ、失敗の場合2番目がエラーメッセージ
            // if (!json_data[0]) {    // サーバが失敗を返した場合
            //     alert("Transaction error. " + json_data[1]);
            //     return;
            // }
            // 成功時処理
            console.log(json_data);
            button.attr("disabled", false);  // ボタンを再び enableにする
            var data = json_data.latLngs;
            var info = json_data.infos;
            var route = json_data.route;
            //マーカーの準備
            var infoWindow = [];
            var marker = [];
            function markerEvent(i) {
              marker[i].addListener('click', function() { // マーカーをクリックしたとき
                infoWindow[i].open(map, marker[i]); // 吹き出しの表示
              });
            }
            for(i =0;i<json_data.infos.length;i++){
              position = json_data.infos[i].position;
              content = json_data.infos[i].point;
              marker[i] = new google.maps.Marker({ // マーカーの追加
                position: position, // マーカーを立てる位置を指定
                map: map, // マーカーを立てる地図を指定
                icon:{
		                url: 'pin.png',                      //アイコンのURL
		                  scaledSize: new google.maps.Size(15, 15) //サイズ
	                   }
              });
              infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                content: content // 吹き出しに表示する内容
              });
              markerEvent(i);
            }
            // パスを描画します。
            var line = new google.maps.Polyline({
                map: map, // 描画先の地図
                strokeColor: "#2196f3", // 線の色
                //strokeColor:"#000000",
                strokeOpacity: 0.8, // 線の不透明度
                strokeWeight: 6, // 先の太さ
                path: data // 描画するパスデータ
            });
            document.getElementById("route").innerHTML = "<div>Route</div>"
            for(i=0;i<route.length;i++){
              document.getElementById("route").innerHTML +=  "<div>"+route[i]+"</div>"
              document.getElementById("route").innerHTML +=  "<div>⇩</div>"
            }
            document.getElementById("route").innerHTML +=  "<div>"+route[0]+"</div>"

            //
        },
        error: function() {         // HTTPエラー時
            alert("Server Error. Pleasy try again later.");
        },
        complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            button.attr("disabled", false);  // ボタンを再び enableにする
        }
    });
});
