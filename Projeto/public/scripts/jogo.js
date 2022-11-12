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

  const itensCorrets = document.getElementsByClassName("ErrorResponse");

  Array.from(itensCorrets).forEach(Error);
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
