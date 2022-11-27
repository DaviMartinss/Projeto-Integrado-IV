function confirm(questaoId) {
  Swal.fire({
    title: 'Você tem certeza que deseja apagar essa pergunta?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Apagar!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/deleteQuestion?QuestaoId=${questaoId}`;
    }
  })
}

function denunciar(questaoId) {
  console.log("Id na função = " + questaoId);
  Swal.fire({
    title: 'Você tem certeza que deseja denunciar essa pergunta?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Denunciar!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/denunciarQuestion?QuestaoId=${questaoId}`;
    }
  })
}

function validarDenunciar(questaoId) {

  Swal.fire({
    title: 'Você tem certeza que deseja aceitar a denunciar dessa pergunta?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Aceitar Denúncia!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/validarDenunciar?QuestaoId=${questaoId}`;
    }
  })
}

function rejeitarDenunciar(questaoId) {

  Swal.fire({
    title: 'Você tem certeza que deseja rejeitar a denunciar dessa pergunta?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Rejeitar Denúncia!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/rejeitarDenunciar?QuestaoId=${questaoId}`;
    }
  })
}