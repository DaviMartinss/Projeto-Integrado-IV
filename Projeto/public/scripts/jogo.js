function Acept(item){

    item.style.backgroundColor = '#32CD32';
    item.style.color = '#FFFFFF';
}

function AceptResponse(){

  const itensCorrets = document.getElementsByClassName("CorretResponse");

  Array.from(itensCorrets).forEach(Acept);
}

function Error(item){

    item.style.backgroundColor = '#e30b21';
    item.style.color = '#FFFFFF';
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
