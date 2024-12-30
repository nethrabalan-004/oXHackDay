var nexxt=document.getElementById("nexxt");
var cont2=document.getElementById("cont2");
var cont1=document.getElementById("cont1");
var img=document.getElementById("img");
const name = document.getElementById("name");
const no = document.getElementById("no");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const annualIncome = document.getElementById("AnnualIncome");
const investment = document.getElementById("Investment");
const investmentType = document.getElementById("investmentType");
const specificCondition = document.getElementById("specificCondition");
const duration = document.getElementById("duration");
const city = document.getElementById("city");

nexxt.addEventListener("click",()=>{
    if (
        !name.value ||   !no.value ||
        !email.value ||
        !dob.value ||
        !annualIncome.value 
      ) {
        alert("Please fill all the fields.");
      }
      else{
    cont1.style.display="none";
    cont2.style.display="flex";
    img.style.animation="moov 1s";
      }
})

var goNext=document.getElementById("goNext");
var ttop=document.getElementById("ttop");
var  fot=document.getElementById("fot");
var check=document.getElementById("check");
var head=document.getElementById("head");
goNext.addEventListener("click",()=>{
    
    
   ttop.style.display="none";
   head.style.display="none";
   fot.style.display="none";
   check.style.display="flex";
})


const sub=document.getElementById("sub");
const responseContainer = document.getElementById('response');

sub.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!investment.value || !investmentType.value || !specificCondition.value || !duration.value || !city.value) {
        alert("Please fill all the required fields.");
      }
      else{
    check.style.display="none";
    head.style.display="flex";
    // fot.style.display="flex";
    responseContainer.style.display="block";

    const formData = {
        name: document.getElementById('name').value,
        no: document.getElementById('no').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        AnnualIncome: document.getElementById('AnnualIncome').value,
        Investment: document.getElementById('Investment').value,
        investmentType: document.getElementById('investmentType').value,
        specificCondition: document.getElementById('specificCondition').value,
        duration: document.getElementById('duration').value,
        city: document.getElementById('city').value,
    };
    console.log(formData);

    try {
        const response = await fetch('http://127.0.0.1:3001/invest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
           
    // Replace \n with <br> and remove * characters
    var formattedMessage = (data.msg || '')
    .replace(/\n/g, '<br>');
    formattedMessage = formattedMessage.replace("html","")
    formattedMessage = formattedMessage.replace("'","")

//
    // .replace(/\/{2,}/g, '<hr>') // Keep this unchanged for handling <hr>
    // .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Make content between double ** bold
    // .replace(/\*/g, ''); // Remove all single *

// // Find the first and last <hr>
// const firstHrIndex = formattedMessage.indexOf('<hr>');
// const lastHrIndex = formattedMessage.lastIndexOf('<hr>');

// // Keep only the content between the first and last <hr>
// if (firstHrIndex !== -1 && lastHrIndex !== -1 && firstHrIndex < lastHrIndex) {
//     formattedMessage = formattedMessage.substring(firstHrIndex + 4, lastHrIndex);
// }

// const parts = formattedMessage.split('<br>');
// if (parts.length > 2) {
//     formattedMessage = parts.slice(2).join('<br>');
// }

// formattedMessage=formattedMessage.replace(/<hr>/g, "");




responseContainer.innerHTML = formattedMessage
        } else {
            responseContainer.textContent = 'Error: Unable to process the request.';
        }
    } catch (error) {
        console.error('Error:', error);
        responseContainer.textContent = 'An error occurred while submitting the form.';
    }
}
});