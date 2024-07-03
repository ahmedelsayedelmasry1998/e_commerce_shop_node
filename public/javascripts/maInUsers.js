/* Tab Bar Action */
let tabs = document.querySelectorAll(".tabs")[0];
let ulMain = document.querySelectorAll(".profile")[0];
let ulSub =  document.querySelectorAll(".ul-sub")[0];
tabs.onclick = function() {
    if (document.querySelectorAll(".links")[0].style.width == "0%")
    {
        document.querySelectorAll(".links")[0].style.width = "20%";
        document.querySelectorAll(".content")[0].style.width = "80%";
    }else{
        document.querySelectorAll(".links")[0].style.width = "0%";
         document.querySelectorAll(".content")[0].style.width = "100%";
    }
 
//   document.querySelectorAll(".links")[0].classList.toggle("w-0");
//   document.querySelectorAll(".content")[0].classList.toggle("w-100");
}
/* Tab Bar Action */
/* Brofile Action */
ulMain.onclick = function (){
    ulSub.classList.toggle("h-s");
    document.querySelectorAll(".icon-rotate")[0].classList.toggle("change-icon");
}
/* Brofile Action */
/* Links Action */
let titleContent = document.querySelectorAll(".title-content")[0].innerHTML;
let links = document.querySelectorAll(".links a");
// let titles = [
//     "Dashboard",
//     "Categories",
//     "Items",
//     "Members",
//     "Comments",
// ];
let titles = [];
for(let z = 0 ; z < links.length;z++)
{
    titles.push(links[z].innerHTML);
}
for(let x = 0 ; x < titles.length;x++)
{
    if(titles[x].includes(titleContent))
    {
        for(let i = 0 ; i < links.length;i++)
        {
            links[i].classList.remove("act");
            links[x].classList.add("act");
        }
    }
}
/* Links Action */
