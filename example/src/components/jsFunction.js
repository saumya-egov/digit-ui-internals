import './style.css';

export default function js_function(){
const shadowStytle = "10px 10px 12px #888888";

const appRef = document.getElementById('applyme');
debugger
appRef.innerHTML = `<div class="box" id="box"></div>`;

const boxRef = document.getElementById("box");
const xOffset = boxRef.clientWidth / 2;
const yOffset = boxRef.clientHeight / 2;

let selectionLocked = false;

function lockSelection() {
  selectionLocked = true;
  boxRef.style.boxShadow = shadowStytle;
  boxRef.style.backgroundColor = "red";
}

function unlockSelection() {
  selectionLocked = false;
  boxRef.style.boxShadow = "none";
  boxRef.style.backgroundColor = "black";
}

unlockSelection();

boxRef.addEventListener("mousedown", (arg) => {
  console.log(arg);
  lockSelection();
});

boxRef.addEventListener("mouseup", (arg) => {
  console.log(arg);
  unlockSelection();
});

boxRef.addEventListener("mouseleave", (arg) => {
  console.log(arg);
  if (selectionLocked) {
    selectionLocked = false;
    boxRef.style.boxShadow = "none";
  }
});

appRef.addEventListener("mousemove", (arg) => {
  console.log(arg);
  if (selectionLocked) {
    boxRef.style.left = `${arg.clientX - xOffset}px`;
    boxRef.style.top = `${arg.clientY - yOffset}px`;
  }
});
}