export default class HelpDesk {
  constructor(container, ticketService) {
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    this.renderTickets();
  }

  renderTickets() {
    this.ticketService.list()
      .then((tickets) => {
        this.container.innerHTML = ''; 
        tickets.forEach((ticket) => {
          const ticketEl = document.createElement('div');
          ticketEl.className = 'ticket';
          ticketEl.textContent = ticket.name;
          this.container.append(ticketEl);
        });
      })
      .catch((err) => console.error(err));
  }
}
