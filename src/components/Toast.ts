import Toastify from 'toastify-js';

export function Toast(message: string) {
  Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: { 
        background: "#000000",
        borderRadius: "15px",
      },
      onClick: function(){} // Callback after click
    }).showToast();
}
