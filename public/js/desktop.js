const desktopNode = document.querySelector("#desktop");
const btnAttendNode = document.querySelector("#btnAttend");
const attendTargetNode = document.querySelector("#attendTarget");
const noTicketsBoxNode = document.querySelector("#noTicketsBox");
const lblPendingTickets = document.querySelector("#lblPendingTickets");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desktop")) {
  window.location = "index.html";
  throw new Error("The desktop is mandatory!");
}

const desktop = searchParams.get("desktop");
desktopNode.innerText = desktop;
noTicketsBoxNode.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnAttendNode.disabled = false;
});

socket.on("disconnect", () => {
  btnAttendNode.disabled = true;
});

socket.on("ticketsPending", (pendingTickets) => {
  if (!pendingTickets) {
    lblPendingTickets.style.display = "none";
    return
  }
  lblPendingTickets.innerHTML = pendingTickets;
})

btnAttendNode.addEventListener("click", () => {
  socket.emit("attendTicket", { desktop }, ({ ok, ticket }) => {
    if (!ok) {
      attendTargetNode.innerText = "Nobody";
      noTicketsBoxNode.style.display = "";
      return;
    }
    noTicketsBoxNode.style.display = "none";
    attendTargetNode.innerText = `Ticket ${ticket.number}`;
  });
});
