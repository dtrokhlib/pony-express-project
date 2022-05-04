const invalidAlert = (message) => {
  if (Array.isArray(message)) {
    message = message.join('<br>');
  }
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    html: message,
    footer: '<a href="">Got It</a>',
  });
};

const successAlert = async (message) => {
  await Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
  document.location = '/emails-page.html';
};
