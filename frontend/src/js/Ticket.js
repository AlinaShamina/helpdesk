export default class Ticket {
  constructor({ id, name, description, status }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }

  render() {
    const el = document.createElement('div');
    el.className = 'ticket';
    if (this.status) el.classList.add('done');

    const doneCheckbox = document.createElement('input');
    doneCheckbox.type = 'checkbox';
    doneCheckbox.className = 'done-checkbox';
    doneCheckbox.checked = this.status;

    const body = document.createElement('div');
    body.className = 'ticket-body';
    body.textContent = this.name;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.textContent = '✎';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'x';

    el.append(doneCheckbox, body, editBtn, deleteBtn);
    return el;
  }
}
