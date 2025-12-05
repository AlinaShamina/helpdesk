export default function TicketForm(ticket = null) {
  const modal = document.createElement('div');
  modal.className = 'modal';

  const form = document.createElement('div');
  form.className = 'modal-content';

  const titleInput = document.createElement('input');
  titleInput.placeholder = 'Заголовок';
  titleInput.value = ticket ? ticket.name : '';

  const descriptionInput = document.createElement('textarea');
  descriptionInput.placeholder = 'Описание';
  descriptionInput.value = ticket ? ticket.description : '';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Сохранить';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Отмена';
  closeBtn.addEventListener('click', () => close());

  form.append(titleInput, descriptionInput, saveBtn, closeBtn);
  modal.append(form);

  saveBtn.addEventListener('click', () => {
    if (onSubmit) {
      onSubmit({
        name: titleInput.value,
        description: descriptionInput.value,
        status: ticket ? ticket.status : false,
      });
    }
  });

  function open() {
    document.body.append(modal);
  }

  function close() {
    modal.remove();
  }

  let onSubmit = null;

  return { open, close, set onSubmit(fn) { onSubmit = fn; } };
}
