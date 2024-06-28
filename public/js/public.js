const lblTicket1 = document.querySelector("#lblTicket1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblTicket4 = document.querySelector("#lblTicket4");

const lblDesktop1 = document.querySelector("#lblDesktop1");
const lblDesktop2 = document.querySelector("#lblDesktop2");
const lblDesktop3 = document.querySelector("#lblDesktop3");
const lblDesktop4 = document.querySelector("#lblDesktop4");

const socket = io();

socket.on("currentState", (payload) => {
  const audio = new Audio('../audio/new-ticket.mp3');
  audio.play();

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  lblTicket1.innerText = ticket1 && `Ticket ${ticket1.number}`;
  lblDesktop1.innerText = ticket1 && ticket1.desktop;

  lblTicket2.innerText = ticket2 && `Ticket ${ticket2.number}`;
  lblDesktop2.innerText = ticket2 && ticket2.desktop;

  lblTicket3.innerText = ticket3 && `Ticket ${ticket3.number}`;
  lblDesktop3.innerText = ticket3 && ticket3.desktop;

  lblTicket4.innerText = ticket4 && `Ticket ${ticket4.number}`;
  lblDesktop4.innerText = ticket4 && ticket4.desktop;
});
