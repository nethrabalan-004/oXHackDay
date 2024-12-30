const heada=document.getElementById('head');
const bbb=document.getElementById('bbb');
function swap1(){
    const c1=document.getElementById("container1")
    const c2=document.getElementById("container2")
    if(c1.style.display=="block"){
        if (!document.getElementById("firstName").value || 
    !document.getElementById("lastName").value || 
    !document.getElementById("gender").value || 
    !document.getElementById("maritalStatus").value || 
    !document.getElementById("dependents").value || 
    !document.getElementById("education").value || 
    !document.getElementById("employmentType").value || 
    !document.getElementById("applicantMonthlyIncome").value || 
    !document.getElementById("coApplicantMonthlyIncome").value) {
    alert("Please fill in all the fields.");
}
else{
        c1.style.display="none"
        c2.style.display="block"
        bbb.style.animation="moov 0.8s"
        bbb.style.transition="1s"
    }
    }else{
        
        c1.style.display="block"
        c2.style.display="none"
        bbb.style.animation="moov 0.8s"
        bbb.style.transition="1s"
    }
}
const container=document.getElementById('container')
const resCont=document.getElementById('result-cont')
const submit=document.getElementById('submit')
submit.addEventListener("click",(e)=>{
    if (!document.getElementById('loanAmountRequested').value || 
    !document.getElementById('loanTerm').value || 
    !document.getElementById('creditHistory').value || 
    !document.getElementById('propertyArea').value || 
    !document.getElementById('existingLiabilities').value || 
    !document.getElementById('loanPurpose').value || 
    !document.getElementById('collateralValue').value) {
    alert("Please fill in all the loan-related fields.");
}
else{
    e.preventDefault()
    heada.style.display="flex"
    container.style.display='none'
    resCont.style.display='flex'
    const name=document.getElementById("firstName").value
    const age=document.getElementById("lastName").value
    const gender=document.getElementById("gender").value
    const maritalStatus=document.getElementById("maritalStatus").value
    const dependents=document.getElementById('dependents').value
    const education=document.getElementById("education").value
    const employmentType=document.getElementById("employmentType").value
    const appMonthlyIncome=document.getElementById('applicantMonthlyIncome').value
    const coAppMonthlyIncome=document.getElementById('coApplicantMonthlyIncome').value
    const loanAmountRequested=document.getElementById('loanAmountRequested').value
    const loanTerm=document.getElementById('loanTerm').value
    const creditHistory=document.getElementById('creditHistory').value
    const propertyArea=document.getElementById('propertyArea').value
    const existingLiabilities=document.getElementById('existingLiabilities').value
    const loanPurpose=document.getElementById('loanPurpose').value
    const collateralValue=document.getElementById('collateralValue').value

    if(!name || !gender|| !maritalStatus|| !dependents|| !education|| !employmentType||!appMonthlyIncome|| !coAppMonthlyIncome
        ||!loanAmountRequested||!loanTerm||!creditHistory||!propertyArea||!existingLiabilities
        ||!loanPurpose||!collateralValue){
        document.getElementById("err").innerHTML="Please fill all required fields"
    }else{
        fetch('http://localhost:3002/loanPredictionForm',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                age:age,
                gender:gender,
                maritalStatus:maritalStatus,
                dependents:dependents,
                education:education,
                employmentType:employmentType,
                appMonthlyIncome:appMonthlyIncome,
                coAppMonthlyIncome:coAppMonthlyIncome,
                loanAmountRequested:loanAmountRequested,
                loanTerm:loanTerm,
                creditHistory:creditHistory,
                propertyArea:propertyArea,
                existingLiabilities:existingLiabilities,
                loanPurpose:loanPurpose,
                collateralValue:collateralValue
            })
        })
        .then((res)=>{
            return res.json()
        }).then((res)=>{
            
            const data=res.msg
            resCont.innerHTML=data
        })
    }
}
})

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

const cont=document.getElementById('conttt');
const forms=document.getElementById('forms');
const elements = document.querySelectorAll('#nextELI');

// Iterate over each element and add a click event listener
elements.forEach(element => {
  element.addEventListener('click', () => {
    console.log('clicked')
    heada.style.display="none";
    cont.style.display="none";
    forms.style.display="block"
  });
});