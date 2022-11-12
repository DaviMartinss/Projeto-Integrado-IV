function confirm(questaoId){
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