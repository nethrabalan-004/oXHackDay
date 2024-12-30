const d1=document.getElementById("d1");
const d2=document.getElementById("d2");
const d3=document.getElementById("d3");
const d4=document.getElementById("d4");
const c1=document.getElementById("c1");
const c2=document.getElementById("c2");
const c3=document.getElementById("c3");
const c4=document.getElementById("c4");
var x1=0,x2=0,x3=0,x4=0
d1.addEventListener("click",()=>{
    if(x1==0)
    {
    c1.style.display="block";
    c1.style.width="100%";
    d1.style.transform="rotate(270deg)"
    d1.style.transition="1s"
    c1.transition="1s"
    x1=1
    }
    else{
        c1.style.display="none";
        d1.style.transform="rotate(90deg)";
        c1.style.width="0";
        x1=0
    }
})
d2.addEventListener("click",()=>{
    if(x2==0)
    {
    c2.style.display="block";
    c2.style.width="100%";
    d2.style.transform="rotate(270deg)"
    d2.style.transition="1s"
    c2.transition="1s"
    x2=1
    }
    else{
        c2.style.display="none";
        d2.style.transform="rotate(90deg)";
        c2.style.width="0";
        x2=0
    }
});
 d3.addEventListener("click",()=>{
    if(x3==0)
    {
    c3.style.display="block";
    c3.style.width="100%";
    d3.style.transform="rotate(270deg)"
    d3.style.transition="1s"
    c3.transition="1s"
    x3=1
    }
    else{
        c3.style.display="none";
        d3.style.transform="rotate(90deg)";
        c3.style.width="0";
        x3=0
    }
});

d4.addEventListener("click",()=>{
    if(x4==0)
        {
        c4.style.display="block";
        c4.style.width="100%";
        d4.style.transform="rotate(270deg)"
        d4.style.transition="1s"
        c4.transition="1s"
        x4=1
        }
    else{
        c4.style.display="none";
        d4.style.transform="rotate(90deg)";
        c4.style.width="0";
        x4=0
    }
})