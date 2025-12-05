import Ticket from './Ticket.js';
import TicketService from './TicketService.js';
import TicketForm from './TicketForm.js';

export default function App() {
  const container = document.createElement('div');

  const addButton = document.createElement('button');
  addButton.textContent = 'Добавить тикет';
  addButton.className = 'add-ticket-button';
  addButton.addEventListener('click', () => openTicketModal());
  container.append(addButton);

  const ticketsContainer = document.createElement('div');
  ticketsContainer.id = 'tickets-container';
  container.append(ticketsContainer);

  async function loadTickets() {
    ticketsContainer.replaceChildren();
    try {
      const tickets = await TicketService.getTickets();
      tickets.forEach(ticketData => {
        const ticket = new Ticket(ticketData);
        const el = ticket.render();

        el.querySelector('.delete').addEventListener('click', async (e) => {
          e.stopPropagation();
          await TicketService.deleteTicket(ticket.id);
          loadTickets();
        });

        el.querySelector('.edit').addEventListener('click', async (e) => {
          e.stopPropagation();
          openTicketModal(ticketData);
        });

        el.querySelector('.done-checkbox').addEventListener('change', async (e) => {
          await TicketService.updateTicket(ticket.id, { status: e.target.checked });
          loadTickets();
        });

        el.querySelector('.ticket-body').addEventListener('click', () => {
          alert(`Детали тикета:\n${ticket.name}\n${ticket.description}`);
        });

        ticketsContainer.append(el);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function openTicketModal(ticket = null) {
    const form = TicketForm(ticket);
    form.onSubmit = async (data) => {
      if (ticket) {
        await TicketService.updateTicket(ticket.id, data);
      } else {
        await TicketService.createTicket(data);
      }
      loadTickets();
      form.close();
    };
    form.open();
  }

  loadTickets();

  return container;
}
