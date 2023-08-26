window.onload=showtask();
let inputtext=document.getElementById("inputdata");
let addbutton=document.getElementById("addbutton");
let deleteall=document.getElementById("de-all-but");
let savebutton=document.getElementById("editbutton");
let savevalue=document.getElementById("savevalue");

addbutton.addEventListener('click',(e)=>{
    e.preventDefault();
    inputtextval=inputtext.value;
    if(inputtextval.trim()!=0){
        let webtask=localStorage.getItem("localtask");
        if(webtask==null){
            task=[]}
        else{
            task=JSON.parse(webtask);
        }
        task.push(inputtextval);
        localStorage.setItem("localtask",JSON.stringify(task));
    }
    inputtext.value="";
    showtask();
})
function showtask(){
    let webtask=localStorage.getItem("localtask");
    if(webtask==null){
        task=[]}
    else{
        task=JSON.parse(webtask);
    }
    let html='';
    let table=document.getElementById("table");
    task.forEach((item,index) => {
        html+=`  <tr>
        <td style="width:10%"><input type="checkbox" name="" id="" class="check" onclick="check(this)"></td>
        <td>${item}</td>
        <td><button class="blue" onclick="edit(${index})">edit</button></td>
        <td><button class="red" onclick="deleteitem(${index})">delete</button></td>
    </tr>`
    table.innerHTML=html; 
    });
}

deleteall.addEventListener('click',()=>{
    localStorage.removeItem("localtask");
})

function edit(index){
    let webtask=localStorage.getItem("localtask");
    if(webtask==null){
        task=[]}
    else{
        task=JSON.parse(webtask);
    }
    inputtext.value=task[index];
    savevalue.value=index;
    savebutton.style.display="block";
    addbutton.style.display="none";
    addbutton.disabled="true";
}

savebutton.addEventListener('click',()=>{
    let webtask=localStorage.getItem("localtask");
    if(webtask==null){
        task=[]}
    else{
        task=JSON.parse(webtask);
    }
    task[savevalue.value]=inputtext.value;
    localStorage.setItem("localtask",JSON.stringify(task));
})

function deleteitem(index){
    let webtask=localStorage.getItem("localtask");
    if(webtask==null){
        task=[]}
    else{
        task=JSON.parse(webtask);
    }
    task.splice(index,1);
    localStorage.setItem("localtask",JSON.stringify(task));
    location.reload();
    // showtask();
}

//search bar;


let search=document.getElementById("search");
search.addEventListener('input',()=>{
    let trlist=document.querySelectorAll("tr");
    Array.from(trlist).forEach((item)=>{
        let searchtext=item.getElementsByTagName('td')[1].innerText;
        let searchvalue=search.value;
        let re=new RegExp(searchvalue,"gi");
        if(searchtext.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})
// let checkbox=document.getElementsByClassName("check")[0];
// checkbox.addEventListener('change',()=>{
//     if(this.checked=true){
//         this.nextElementSibling.style.textDecoration="line-through";
//     }
// })
function check(ele){
        // console.log(ele.parentNode.nextElementSibling);
        // let webtask=localStorage.getItem("localtask");
        // if(webtask==null){
        //     task=[]}
        // else{
        //     task=JSON.parse(webtask);
        // }
        // console.log(ele.checked);
        if(ele.checked==true){
            let a=ele.parentNode.nextElementSibling;
            a.style.textDecoration ="line-through";
            a.style.color="gray";
        }
       else{
        let a=ele.parentNode.nextElementSibling;
        a.style.textDecoration ="none";
            a.style.color="black";
       }
}