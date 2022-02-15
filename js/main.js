const btns = document.querySelectorAll("#navi a");

btns.forEach((btn, index)=>{
  btn.addEventListener("focusin",e=>{
    e.currentTarget.classList.add("on");
  })

  btn.addEventListener("focusout",e=>{
    e.currentTarget.classList.remove("on");
  })
})