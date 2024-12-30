const d1=document.getElementById("d1");
const d2=document.getElementById("d2");
const d3=document.getElementById("d3");
const d4=document.getElementById("d4");
const d5=document.getElementById("d5");
const c1=document.getElementById("c1");
const c2=document.getElementById("c2");
const c3=document.getElementById("c3");
const c4=document.getElementById("c4");
const c5=document.getElementById("c5");
const heada=document.getElementById("head");
var x1=0,x2=0,x3=0,x4=0,x5=0
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
d5.addEventListener("click",()=>{
    if(x5==0)
    {
    c5.style.display="block";
    c5.style.width="100%";
    d5.style.transform="rotate(270deg)"
    d5.style.transition="1s"
    c5.transition="1s"
    x5=1
    }
    else{
        c5.style.display="none";
        d5.style.transform="rotate(90deg)";
        c5.style.width="0";
        x5=0
    }
});

// -------------------------------------------------------------------------
const abtH=document.getElementById("abtH");
const commonInp=document.getElementById("commonInp");
const start=document.getElementById("start");
const fot=document.getElementById("fot");
start.addEventListener("click",()=>{
    commonInp.style.display="flex";
    abtH.style.display="none";
    fot.style.display="none";
})

const next=document.getElementById("next");
const p33=document.getElementById("p33");
const p11=document.getElementById("p11");
const p22=document.getElementById("p22");

const insuranceType=document.getElementById("insuranceType");


const Life = document.getElementById('Life');
const TermLife = document.getElementById('TermLife');
const Renters = document.getElementById('Renters');  // Ensure this option is in your HTML now
const PersonalAccident = document.getElementById('PersonalAccident');
const CriticalIllness = document.getElementById('CriticalIllness');
const ChildEducation = document.getElementById('ChildEducation');
const IncomeProtection = document.getElementById('IncomeProtection');
const FamilyFloaterHealth = document.getElementById('FamilyFloaterHealth');
const Retirement = document.getElementById('Retirement');  // Ensure this option is in your HTML now
const TwoWheeler = document.getElementById('TwoWheeler');  // Ensure this option is in your HTML now
const Pet = document.getElementById('Pet');
const Health = document.getElementById('Health');
const Automobile = document.getElementById('Automobile');
const Agriculture = document.getElementById('Agriculture');
const Marine = document.getElementById('Marine');
const WorkmenCompensation = document.getElementById('WorkmenCompensation');  // Ensure this option is in your HTML now
const Cyber = document.getElementById('Cyber');
const Travel = document.getElementById('Travel');


const insuranceSections = [
    "Life", "TermLife", "Renters", "PersonalAccident", "CriticalIllness",
    "ChildEducation", "IncomeProtection", "FamilyFloaterHealth", 
    "TwoWheeler", "Pet", "Health", "Automobile", "Agriculture", "Marine",
    "WorkmenCompensation", "Cyber"," "
];
var r="Retirement",t="Travel"
// Event listener for the dropdown change
// insuranceType.addEventListener('change', function() {
//     const selectedInsurance = this.value; // Get the selected insurance type
    
//     // Hide all insurance sections
//     insuranceSections.forEach((sectionId) => {
//         const section = document.getElementById(sectionId);
//         if (section) {
//             section.style.display = 'none';
//         }
//     });

//     // Show the selected insurance section
//     const selectedSection = document.getElementById(selectedInsurance);
//     if (selectedSection) {
//         selectedSection.style.display = 'block';
//     }
// });

next.addEventListener("click", () => {
    const selectedInsurance = insuranceType.value.trim(); // Get the selected insurance type
    console.log(selectedInsurance);

    // Handle special cases for Travel, Life, and Retirement
    if (selectedInsurance === "Travel" || selectedInsurance === "Life" || selectedInsurance === "Retirement") {
        if (
            !document.getElementById('name').value.trim() ||
            !document.getElementById('dob').value.trim() ||
            !document.getElementById('gender').value.trim() ||
            !document.getElementById('maritalStatus').value.trim() ||
            !document.getElementById('AnnualIncome').value.trim() ||
            !document.getElementById('insuranceType').value.trim()
        ) {
            alert("All fields are required. Please fill in all the details.");
            return false;
        }
        else{
        doit()
    }
    }
    else{
    // General logic: Display corresponding section
    if (
        !document.getElementById('name').value.trim() ||
        !document.getElementById('dob').value.trim() ||
        !document.getElementById('gender').value.trim() ||
        !document.getElementById('maritalStatus').value.trim() ||
        !document.getElementById('AnnualIncome').value.trim() ||
        !document.getElementById('insuranceType').value.trim()
    ) {
        alert("All fields are required. Please fill in all the details.");
        return false;
    }
    else{
    insuranceSections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = "none"; // Hide all sections
        }
    });

    const selectedSection = document.getElementById(selectedInsurance);
    if (selectedSection) {
        selectedSection.style.display = "block"; // Display the selected section
    }
}
}

    // Page transition animations
    p33.style.display = "flex";
    p33.style.transition = "0.8s";
    p11.style.display = "none";
    p22.style.animation = "move 0.8s";
});

// Select all elements with the class "subm"
const submElements = document.querySelectorAll('.subm');
const result=document.getElementById('result');

// Attach click event listener to each element
submElements.forEach(element => {
    element.addEventListener('click', event => {
        event.preventDefault(); // Prevent the default action of the element
        commonInp.style.display = 'none';
        result.style.display = 'block';
        // Collect data from form fields
        doit()
    });
});

function doit()
{
    heada.style.display="flex";
    commonInp.style.display = 'none';
        result.style.display = 'block';
    const data = {
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        AnnualIncome: document.getElementById('AnnualIncome').value,
        insuranceType: document.getElementById('insuranceType').value,
        doYouHaveHealthInsuranceOfTermLife: document.getElementById('doYouHaveHealthInsuranceOfTermLife').value,
        houseOwnershipStatus: document.getElementById('houseOwnershipStatus').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        occupation: document.getElementById('occupation').value,
        workExperienceDuration: document.getElementById('workExperienceDuration').value,
        doYouHaveHealthInsuranceOfCriticalIllness: document.getElementById('doYouHaveHealthInsuranceOfCriticalIllness').value,
        childAge: document.getElementById('childAge').value,
        occupationOfIncomeProtection: document.getElementById('occupationOfIncomeProtection').value,
        workExperienceDurationOfIncomeProtection: document.getElementById('workExperienceDurationOfIncomeProtection').value,
        familyMembers: document.getElementById('familyMembers').value,
        doYouHaveHealthInsurance: document.getElementById('doYouHaveHealthInsurance').value,
        healthHistory: document.getElementById('healthHistory').value,
        doYouHavePreExistingVehicleInsurance: document.getElementById('doYouHavePreExistingVehicleInsurance').value,
        renewExistingInsuranceVehicle: document.getElementById('renewExistingInsuranceVehicle').value,
        doYouOwnPet: document.getElementById('doYouOwnPet').value,
        animalType: document.getElementById('animalType').value,
        applyingForNew: document.getElementById('applyingForNew').value,
        typeOfAutomobile: document.getElementById('typeOfAutomobile').value,
        doYouHavePreExistingInsuranceOfAutomobile: document.getElementById('doYouHavePreExistingInsuranceOfAutomobile').value,
        areYouApplyingForNewInsuranceOfAutomobile: document.getElementById('areYouApplyingForNewInsuranceOfAutomobile').value,
        renewExistingInsuranceOfAutomobile: document.getElementById('renewExistingInsuranceOfAutomobile').value,
        farmLocation: document.getElementById('farmLocation').value,
        cropType: document.getElementById('cropType').value,
        totalFarmSize: document.getElementById('totalFarmSize').value,
        liveStockType: document.getElementById('liveStockType').value,
        vesselNameOfMarine: document.getElementById('vesselNameOfMarine').value,
        cargoDescription: document.getElementById('cargoDescription').value,
        cargoValue: document.getElementById('cargoValue').value,
        CoverageType: document.getElementById('CoverageType').value,
        voyageRoute: document.getElementById('voyageRoute').value,
        businessName: document.getElementById('businessName').value,
        employeeJobTitle: document.getElementById('employeeJobTitle').value,
        totalAnnualPayroll: document.getElementById('totalAnnualPayroll').value,
        coverageAmount: document.getElementById('coverageAmount').value,
        safetyProgramInPlace: document.getElementById('safetyProgramInPlace').value,
        profession: document.getElementById('profession').value,
        doYouHaveCybersecurityIncidentResponsePlan: document.getElementById('doYouHaveCybersecurityIncidentResponsePlan').value,
        coverageAmountCyber: document.getElementById('coverageAmountCyber').value,
        haveYouHadAnyCyberIncidentsInThePast3Years: document.getElementById('haveYouHadAnyCyberIncidentsInThePast3Years').value,
        doYouUseMultiFactorAuthenticationMFA: document.getElementById('doYouUseMultiFactorAuthenticationMFA').value
    };

    // Send data to server
    fetch('http://localhost:3000/insure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
        const formattedMsg = res.msg.replace("```html","").replace("```","")
        result.innerHTML = formattedMsg;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit the form. Please try again.');
    });
}