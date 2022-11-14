function Acept(item){

    item.style.backgroundColor = '#32CD32';
    item.style.color = '#FFFFFF';
    item.style.opacity = '1';
}

function AceptResponse(){

  const itensCorrets = document.getElementsByClassName("CorretResponse");

  Array.from(itensCorrets).forEach(Acept);
}

function Error(item){

    item.style.backgroundColor = '#e30b21';
    item.style.color = '#FFFFFF';
    item.style.opacity = '1';
}

function ErrorResponse(){

  const itensErrors = document.getElementsByClassName("ErrorResponse");

  Array.from(itensErrors).forEach(Error);
}

function Disable(item){

    item.disabled = "true";
}

function DisableButtons(){

  const buttons = document.getElementsByClassName("btn");

  Array.from(buttons).forEach(Disable);
}

function ValidateQuests(){
  DisableButtons();
  AceptResponse();
  ErrorResponse();

}

function Ajudar(){

  let ajuda = document.getElementById("Ajuda");

  ajuda.value = 0;

  const itensErrors = document.getElementsByClassName("ErrorResponse");

  Array.from(itensErrors).forEach((item, count)=>
  {
    if(count == 2)
      return;

    item.style.backgroundColor = '#e30b21';
    item.style.color = '#FFFFFF';
    item.disabled = "true";

  });

}

function Winner(total){
  Swal.fire({
    title: 'Você ganhou!',
    width:'100%',
    text: `Seu prêmio: R$ ${total}`,
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Voltar ao Menu',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/home`;
    }
  })
}

function StopGame(total){

  Swal.fire({
    title: 'Você tem certeza que deseja parar o Jogo?',
    width:'100%',
    text: `Seu prêmio: R$ ${total}`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Parar!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/StopGame?Parar=${1}`;
    }
  })
}

function LoserGame(total){
  Swal.fire({
    title: 'Você perdeu!',
    width:'100%',
    text: `Seu prêmio: R$ ${total}`,
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Voltar ao Menu',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/home`;
    }
  })
}
