const btnCreate = document.getElementById('sendLetter');
const recipient = document.getElementById('recipient');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

btnCreate.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch('/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      from: 'sendify.mailer@gmail.com',
      to: recipient.value,
      subject: subject.value,
      body: message.value,
    }),
  });

  const parsedResponse = await response.json();
  switch (response.status) {
    case 400:
      invalidAlert(parsedResponse.message);
      break;
    case 201:
      successAlert('Email Created');
      recipient.value = '';
      subject.value = '';
      message.value = '';
      break;
    default:
  }
});

const showMyEmails = document.querySelector('.show-my-emails');
const closeMyEmails = document.querySelector('.close-my-emails');
const myEmailsPopup = document.querySelector('.my-emails');

showMyEmails.addEventListener('click', showEmails);

async function showEmails() {
  const response = await fetch('/emails', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parsedResponse = await response.json();
  await renderEmails(parsedResponse);
  await addEmailListeners();
  myEmailsPopup.style.display = 'flex';
}

closeMyEmails.addEventListener('click', () => {
  myEmailsPopup.style.display = 'none';
});

const addEmailListeners = () => {
  const buttonsSend = document.getElementsByClassName('send-button');
  const buttonsEdit = document.getElementsByClassName('edit-button');
  const buttonsDelete = document.getElementsByClassName('delete-button');

  let length = buttonsSend.length;

  for (let i = 0; i < length; i++) {
    buttonsSend[i].addEventListener('click', sendEvent);
    buttonsEdit[i].addEventListener('click', editEvent);
    buttonsDelete[i].addEventListener('click', deleteEvent);
  }
};

const sendEvent = async (e) => {
  const emailId = e.currentTarget.id;
  const response = await fetch(`/emails/send/${emailId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const parsedResponse = await response.json();

  switch (response.status) {
    case 400:
      invalidAlert(parsedResponse.message);
      break;
    case 401:
      invalidAlert(parsedResponse.message);
      break;
    case 403:
      invalidAlert(parsedResponse.message);
      break;
    case 404:
      invalidAlert(parsedResponse.message);
      break;
    case 200:
      successAlert('Email Sent');
      showEmails();
      break;
    default:
  }
};

const btnUpdate = document.getElementById('updateEmail');
const updatedSubject = document.getElementById('update-subject');
const updatedRecipient = document.getElementById('update-recipient');
const updatedBody = document.getElementById('update-message');

const updateEmailPopup = document.querySelector('.update-email-container');
const editEvent = async (e) => {
  const emailId = e.currentTarget.id;
  const response = await fetch(`/emails/${emailId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const parsedResponse = await response.json();

  updatedBody.value = parsedResponse.body;
  updatedRecipient.value = parsedResponse.to;
  updatedSubject.value = parsedResponse.subject;
  setUpdateTrigger(emailId);

  updateEmailPopup.style.display = 'flex';
};

const setUpdateTrigger = (emailId) => {
  btnUpdate.addEventListener('click', async (e) => {
    e.preventDefault();

    const response = await fetch(`/emails/${emailId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        from: 'sendify.mailer@gmail.com',
        to: updatedRecipient.value,
        subject: updatedSubject.value,
        body: updatedBody.value,
      }),
    });

    const parsedResponse = await response.json();
    switch (response.status) {
      case 400:
        invalidAlert(parsedResponse.message);
        break;
      case 200:
        updateEmailPopup.style.display = 'none';
        successAlert('Email Updated');
        break;
      default:
    }
  });
};

const deleteEvent = async (e) => {
  const emailId = e.currentTarget.id;

  const response = await fetch(`/emails/${emailId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  let parsedResponse = '';
  if (response.status !== 204) {
    parsedResponse = await response.json();
  }

  switch (response.status) {
    case 401:
      invalidAlert(parsedResponse.message);
      break;
    case 403:
      invalidAlert(parsedResponse.message);
      break;
    case 404:
      invalidAlert(parsedResponse.message);
      break;
    case 204:
      successAlert('Email Deleted');
      showEmails();
      break;
    default:
  }
};
