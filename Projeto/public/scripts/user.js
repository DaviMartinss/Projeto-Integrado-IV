function EqualsPassword()
{
  var pass = document.getElementById("newPassword").value;
  var confirm = document.getElementById("confirmPassword").value;
  var form = document.getElementById("formPASS");

  console.log("pass = "+pass);
  console.log("confirm = "+confirm);
  console.log("form = "+form);
  if(pass == confirm)
  {
   form.submit();
  }
  else {
   console.log("SENHAS DIFERENTES");

    // alert("Senhas Diferentes");
  }
}

function confirm(userId){

  Swal.fire({
    title: 'Você tem certeza que deseja deletar a sua conta?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Apagar!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/deleteUser?UserId=${userId}`;
    }
  })
}
