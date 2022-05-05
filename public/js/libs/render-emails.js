const emailItemsList = document.querySelector('.email-item-list');

const renderEmails = (emails) => {
  if (!Array.isArray(emails)) {
    emailItemsList.innerHTML = 'No Content';
    return;
  }
  let render = '';

  emails.forEach((email) => {
    render += `<div class="email-item">
          <table>
            <tr>
              <td>
                <strong>To:</strong> ${email.to}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Subject:</strong> ${email.subject}
              </td>
            </tr>
            <tr>
              <td>
                <strong>From:</strong> ${email.from}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Message:</strong> ${email.body}
              </td>
            </tr>
            <tr>
              <td>
                <button id=${email.id} class="send-button">SEND</button><button id=${email.id} class="edit-button">EDIT</button>
              </td>
              <td id=${email.id}>
                <button id=${email.id} class="delete-button">DELETE</button>
              </td>
            </tr>
          </table>
        </div>`;
  });

  emailItemsList.innerHTML = render;
};
