const btns = document.querySelectorAll("#navi a");

btns.forEach((btn, index) => {
  btn.addEventListener("focusin", e => {
    e.currentTarget.classList.add("on");
  })

  btn.addEventListener("focusout", e => {
    e.currentTarget.classList.remove("on");
  })
})

//스크롤
const sections = document.querySelectorAll(".myScroll");
const lis = document.querySelectorAll(".navi li");
const lis_arr = Array.from(lis); 
const base = -200;
let posArr =[]; 

setPos();

window.addEventListener("resize", ()=>{
  setPos(); 
  let activeItem = document.querySelector(".navi li.on"); 
  let activeIndex = lis_arr.indexOf(activeItem); 
  //console.log(activeIndex);
  window.scroll(0, posArr[activeIndex]);
}); 

window.addEventListener("scroll", e => {
  let scroll = window.scrollY || window.pageYOffset;

  sections.forEach((el, index) => {
    if (scroll >= posArr[index] + base) {
      lis.forEach((el, i) => {
        el.classList.remove("on");
        sections[i].classList.remove("on");
      })

      lis[index].classList.add("on");
      sections[index].classList.add("on");
    }
  })
});

lis.forEach((el, index) => {
  el.addEventListener("click", e => {
    new Anim(window, {
      prop: "scroll",
      value: posArr[index],
      duration: 500
    })
    for (let el of lis) {
      el.classList.remove("on");
    }
    e.currentTarget.classList.add("on");
  })
})

function setPos(){
  posArr = []; 
  for(let el of sections){
    posArr.push(el.offsetTop); 
  }
  
}