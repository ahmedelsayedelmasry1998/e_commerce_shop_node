
let user_pass = document.getElementById("user-pass"); 
let old_pass = document.getElementById("old-pass"); 
let inp_pass1 = document.getElementById("inp-pass1"); 
let inp_pass2 = document.getElementById("inp-pass2"); 
let reasualt = document.getElementById("resault"); 
let allRows = document.querySelectorAll(".a");
let btn_run = document.getElementById("btn-run");
old_pass.onkeyup = function (){
    if(user_pass.value == old_pass.value )
        {
            for(let x = 0; x < allRows.length ;x++)
                {
                    allRows[x].classList.remove("h-s");
                }
        }else{
            for(let x = 0; x < allRows.length ;x++)
                {
                    allRows[x].classList.add("h-s");
                }
        }
}
inp_pass2.onkeyup = function(){
    if(this.value != inp_pass1.value){
        btn_run.classList.add("h-s");
        reasualt.innerHTML = "Not Matched ...";
        reasualt.style.color = "red";
    }else{
        btn_run.classList.remove("h-s");
        reasualt.innerHTML = "Matched ...";
        reasualt.style.color = "green";
    }
}