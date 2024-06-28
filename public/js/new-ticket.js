const lblNewTicket = document.querySelector("#lblNewTicket");
const btnGenerate = document.querySelector("#btnGenerate");

const socket = io();

socket.on("connect", () => {
  btnGenerate.disabled = false;
});

socket.on("disconnect", () => {
  btnGenerate.disabled = true;
});

socket.on("lastTicket", (last) => {
  lblNewTicket.innerText = `Ticket ${last}`;
});

btnGenerate.addEventListener("click", () => {
  socket.emit("nextTicket", null, (next) => {
    lblNewTicket.innerText = next;
  });
});
