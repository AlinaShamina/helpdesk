const API_URL = 'http://localhost:7070';

export default class TicketService {
  static async getTickets() {
    const res = await fetch(`${API_URL}?method=allTickets`);
    if (!res.ok) throw new Error('Ошибка при загрузке тикетов');
    return res.json();
  }

  static async createTicket(ticket) {
    const res = await fetch(`${API_URL}?method=createTicket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });
    if (!res.ok) throw new Error('Ошибка при создании тикета');
    return res.json();
  }

  static async updateTicket(id, ticket) {
    const res = await fetch(`${API_URL}?method=updateById&id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });
    if (!res.ok) throw new Error('Ошибка при обновлении тикета');
    return res.json();
  }

  static async deleteTicket(id) {
    const res = await fetch(`${API_URL}?method=deleteById&id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Ошибка при удалении тикета');
    return res.json();
  }
}
