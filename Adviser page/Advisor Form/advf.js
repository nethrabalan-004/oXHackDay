
const nextBut=document.getElementById('next')
const submitBut=document.getElementById('submit')
const bacBut=document.getElementById('back')
nextBut.addEventListener('click',(e)=>{ 
    e.preventDefault()
    const cont1=document.getElementById('container-1')
    cont1.style.display='none'
    const cont2=document.getElementById('container-2')
    cont2.style.display='block'
})

bacBut.addEventListener('click',(e)=>{
    e.preventDefault()
    const cont2=document.getElementById('container-2')
    cont2.style.display='none'
    const cont1=document.getElementById('container-1')
    cont1.style.display='block'
})


submitBut.addEventListener('click',(e)=>{
    e.preventDefault()
    const name=document.getElementById('fname').value+" "+document.getElementById('sname').value
    const age=document.getElementById('age').value
    const email=document.getElementById('email').value
    const gender=document.getElementById('gender').value
    const pass=document.getElementById('cpass').value
    const phnum=document.getElementById('phnum').value
    const address=document.getElementById('address').value
    const bank=document.getElementById('bname').value
    const bankDetails=document.getElementById('bDetails').value
    const city=document.getElementById('city').value
    const state=document.getElementById('state').value
    const lang=document.getElementById('lang').value
    const jobExp=document.getElementById('jExp').value
    if(!name||!age||!email||!gender||!pass||!bank ||!bankDetails ||!city || !state || !lang||!jobExp|| !phnum ||!address){
        const err=document.getElementById('err')
        err.style.display="block"
        err.innerHTML='All fields are required'
    }   
    else{
        fetch("http://localhost:3000/advForm",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,age:age,email:email,gender:gender,pass:pass,phnum:phnum,address:address,
                            bank:bank,bankDetails:bankDetails,city:city,state:state,lang:lang,jobExp:jobExp})
        }).then(res=>{
            return res.json()
        }).then(res=>{
            const form = document.getElementById('form-container')
            form.style.display='none'
            const result=document.getElementById('container2')
            result.style.display='block'
            const data=res.msg
            let name=document.getElementById('profile-name')
            let email=document.getElementById('profile-email')
            let phone=document.getElementById('profile-phone')
            let address=document.getElementById('profile-address')
            name.innerHTML = data.name
            email.innerHTML = data.email
            phone.innerHTML = data.phnum
            address.innerHTML = data.address
        })
    }  

})


    


