function hi(hid){
    hid.style.display="flex";
}
function hello(hid){
    hid.style.display="none";
}  


const search=document.getElementById("search")

search.addEventListener('click',(e)=>{
    e.preventDefault()
    const input=document.getElementById("search-input").value
    console.log(input)
    if(!input){
        alert("Please enter a search term")
        return
    }
    else{
        fetch('http://localhost:3000/search',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({search:input})
        })
        .then(res=>{
            res.json()
        })
        .then(res=>{
            console.log(res.msg)
            // if(!data) return alert("Please enter a search term")
            // console.log(data.age)
            // const datas=document.getElementsByClassName('container1')
            // datas.style.display='none'
        })
    }
    
})