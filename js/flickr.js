const main = document.querySelector(".gallery"); 
const frame = document.querySelector("#list"); 
const base = "https://www.flickr.com/services/rest/?"; 
const method = "flickr.people.getPhotos";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "c3497ae54a8e80023a954c8815e7b28e";
const per_page = 12; 
const format = "json"; 
const loading = document.querySelector(".loading");
const input = document.querySelector("#search"); 
const btn = document.querySelector(".btnSearch"); 

const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&user_id=131793185@N08`; 
const url2 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`; 

callData(url); 


btn.addEventListener("click", e=>{
   let tag = input.value; 
   if(tag == "") return; 
   const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

   callData(url); 
})
input.addEventListener("keypress", e=>{
   if(e.key = "Enter"){
      let tag = input.value; 
      if(tag == "") return; 
      const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

      callData(url); 
   }
})
frame.addEventListener("click", e=>{
   e.preventDefault(); 

   // if(e.target !== e.target.closest(".item").querySelector("img")) return; 
   let target = e.target.closest(".item"); 
   let imgSrc = target.querySelector("a").getAttribute("href"); 

   let pop = document.createElement("aside"); 
   let pops = `
               <img src="${imgSrc}">
               <span class="close">CLOSE</span>
   `; 
   pop.innerHTML = pops; 
   document.querySelector(".gallery").append(pop); 
}); 
main.addEventListener("click", e=>{
   let target = e.target.closest("aside"); 

   if(target !== null){
      let close = target.querySelector(".close"); 
      if(e.target == close) target.remove(); 
   }

})
function callData(url){
   frame.innerHTML ="";
   loading.classList.remove("off");
   frame.classList.remove("on"); 

   fetch(url)
   .then(data=>{
      let result = data.json(); 
      return result; 
   })
   .then(json=>{   
      let items = json.photos.photo;   
      createList(items);
      delayLoading();

   })

}

function createList(items){
   let htmls =""; 
   
   items.map(data=>{
      console.log(data); 
      let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
      let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

      htmls+=`
            <li class="item">
               <div>
                  <a href="${imgSrcBig}">
                     <img src="${imgSrc}" alt="">
                  </a>
                  <span>How to</span>
                  <p>${data.title}</p>
               </div>
            </li>
      `;     
   }); 

   frame.innerHTML = htmls; 
}

function delayLoading(){
   const imgs = frame.querySelectorAll("img"); 
   const len = imgs.length; 
   let count = 0; 
   for(let el of imgs){
      el.onload =()=>{
         count++; 
         if(count === len) isoLayout(); 
      }
      el.onerror = e =>{
         e.currentTarget.closest(".item").style.display = "none"; 
      }
   }
}


function isoLayout(){
   loading.classList.add("off"); 
   frame.classList.add("on"); 

   new Isotope("#list",{
      itemSelector :".item", 
      columnWidth : ".item", 
      transitionDuration : "0.5s"
   })
}