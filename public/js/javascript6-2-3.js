const socketIo = io();
const form = document.getElementById("auctionForm");

// クライアント側からサーバに送信
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let sendData = {
    auctionId: auctionId,
    input1: document.getElementById("auction-input1").value,
    input2: document.getElementById("auction-input2").value,
  };
  console.log(sendData);
  socketIo.emit("c2s", sendData);
});

// サーバ側からクライアントへの受信
socketIo.on("s2c", function (msg) {
  console.log("サーバからクライアントにs2c:" + msg.input1 + msg.input2);
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  li.innerHTML = "input1:" + msg.input1 + " input2" + msg.input2;
  ul.appendChild(li);
});

// 入室時に過去のauction一覧を出す

// 入室時にクライアントから部屋番号をサーバにデータ送信
const sendData = {
  auctionId: auctionId,
};
socketIo.emit("c2s-join", sendData);
