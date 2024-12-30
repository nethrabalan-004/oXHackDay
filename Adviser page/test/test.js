const questions=[
    [
        "What is the difference between term insurance and whole life insurance? (Insurance)",
        "How do banks evaluate creditworthiness for loan approvals? (Loans)",
        "Explain the role of risk appetite in creating an investment portfolio. (Investments)",
        "What is the significance of KYC in banking? (Banking)",
        "How would you advise a client on choosing a health insurance plan? (Insurance)"
    ],
    [
        "How do riders like critical illness benefit a health insurance policyholder? (Insurance)",
        "What is the impact of a low credit score on loan interest rates? (Loans)",
        "How would you guide a client planning for retirement through mutual funds? (Investments)",
        "What are the differences between recurring deposits and fixed deposits? (Banking)",
        "What factors should be considered when calculating the coverage amount for life insurance? (Insurance)"
    ],
    [
        "How can predictive analytics minimize loan default risks? (Loans)",
        "Explain the concept of sub-limits in health insurance policies. (Insurance)",
        "What is dollar-cost averaging, and how does it benefit investors? (Investments)",
        "How do monetary policies affect interest rates on loans? (Banking)",
        "Why should clients consider adding an accidental death rider to their life insurance? (Insurance)"
    ],
    [
        "What is the role of loan-to-value ratio in mortgage loans? (Loans)",
        "How does an annuity plan help in retirement planning? (Insurance)",
        "What is the difference between ety and debt investment strategies? (Investments)",
        "What are non-performing as[NPAs), and why are they significant in banking? (Banking)",
        "How would you assess a client's financial needs for selecting a family floater health insurance plan? (Insurance)"
    ],
    [
        "What is the significance of a debt-to-income ratio when evaluating loans? (Loans)",
        "How do insurance companies calculate premiums for term life insurance? (Insurance)",
        "Discuss the advantages of SIPs in mutual funds. (Investments)",
        "What are Basel norms, and how do they regulate banking? (Banking)",
        "How would you compare endowment policies and ULIPs for a client's financial goals? (Insurance)"              
    ],
    [
        "What is collateral, and how does it reduce a lender's risk? (Loans)",
        "Explain the concept of a free-look period in insurance. (Insurance)",
        "How would you educate a client about active vs. passive investment strategies? (Investments)",
        "What are the primary functions of a commercial bank? (Banking)",
        "How can an insurance policy act as a financial safety net during emergencies? (Insurance)"
    ],
    [
        "How does inflation impact the repayment capacity of loan borrowers? (Loans)",
        "What are the pros and cons of critical illness insurance policies? (Insurance)",
        "What factors should you consider when recommending a diversified investment portfolio? (Investments)",
        "Explain how banks generate income apart from loans. (Banking)",
        "Why is it important to align insurance coverage with a client's financial goals? (Insurance)"
    ],
    [
        "What is the role of guarantors in loan approvals? (Loans)",
        "How would you guide a senior citizen in choosing a health insurance policy? (Insurance)",
        "Discuss the importance of time horizon in investment planning. (Investments)",
        "What is the significance of digital banking for modern customers? (Banking)",
        "How can you help a client plan for unexpected medical expenses through insurance? (Insurance)"
    ],
    [
        "What is the difference between fixed and floating interest rates on loans? (Loans)",
        "How do riders like hospital care enhance a base insurance plan? (Insurance)",
        "What are the tax benefits of investing in ELSS funds? (Investments)",
        "Explain the importance of customer relationship management in banking. (Banking)",
        "How do you calculate the financial impact of adding a top-up health insurance plan? (Insurance)"   
    ],
    [
        "What factors influence the interest rate offered on personal loans? (Loans)",
        "Why is it important to disclose pre-existing conditions while purchasing health insurance? (Insurance)",
        "How do you balance risk and return in an investment portfolio? (Investments)",
        "What is a letter of credit, and how is it used in international trade? (Banking)",
        "How would you compare single-premium and regular-premium insurance plans? (Insurance)"
    ]
]

//code for providing random numbers from 0 to 9
function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

//code for generating random stions and answers
function genQuestions(){
    let i=getRandomNumber()
    var q1=document.getElementById("qn1")
    var q2=document.getElementById("qn2")
    var q3=document.getElementById("qn3")
    var q4=document.getElementById("qn4")
    var q5=document.getElementById("qn5")
    q1.textContent = questions[i][0]
    q2.textContent = questions[i][1]
    q3.textContent = questions[i][2]
    q4.textContent = questions[i][3]
    q5.textContent = questions[i][4]
}
genQuestions()

function submitAnswers(){
    document.getElementById('test-container').style.display="none"
    const result=document.getElementById('result')
    result.style.display="block"
    var q1=document.getElementById("qn1").textContent
    var q2=document.getElementById("qn2").textContent
    var q3=document.getElementById("qn3").textContent
    var q4=document.getElementById("qn4").textContent
    var q5=document.getElementById("qn5").textContent
 
    var a1=document.getElementById("ans1").value
    var a2=document.getElementById("ans2").value
    var a3=document.getElementById("ans3").value
    var a4=document.getElementById("ans4").value
    var a5=document.getElementById("ans5").value
    if(!a1||!a2||!a3||!a4||!a5){
        const err=document.getElementById('err')
        err.style.display="block"
        err.innerHTML="please provide all the answers to continue"
    }
    else{

        fetch("http://localhost:3004/evaluate",{
            method:'POST',
            headers:{
                'Content-Type':'application/json' 
            },
            body:JSON.stringify({
                qn1:q1,qn2:q2,qn3:q3,qn4:q4,qn5:q5,
                ans1:a1,ans2:a2,ans3:a3,ans4:a4,ans5:a5
            })
        })
        .then(res=>{
            return res.json()
        }).then(res=>{
            const response=res.msg
            
            const quali=document.getElementById('quali')
            const rating=document.getElementById('rating')
            const reason=document.getElementById('reason')
            
            const r=response.substring(7,response.length-4)
            const jsonObject = JSON.parse(r);
            
            quali.innerHTML="You are "+jsonObject.Qualification
            rating.innerHTML="Rating: "+jsonObject.rating+"/5"
            reason.innerHTML="Reason: \n"+jsonObject.reason
            if(jsonObject.Qualification=="Qualified"){
                document.getElementById('nxtBut').style.display="block"
            }
        })
    }
    
}


let tabSwitchCount = 0;
const maxSwitches = 3;

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        tabSwitchCount++;

        if (tabSwitchCount < maxSwitches) {
            alert(`You switched tabs! Warning ${tabSwitchCount}/${maxSwitches}`);
        } else {
            alert("You have been disqualified for switching tabs too many times.");
            document.getElementById('test-container').style.display = "none";
            document.getElementById('result').style.display = "block";
            // Close the window after the third tab switch
            window.close();
        }
    }
});

function ensureFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {
            alert("Full-screen mode is required to continue the test.");
        });
    }
}

setInterval(() => {
    if (!document.hasFocus()) {
        alert("You left the test window! Please focus back.");
    }
}, 1000);

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
    if (
        (event.ctrlKey && ["N", "T", "W"].includes(event.key.toUpperCase())) ||
        event.key === "F12"
    ) {
        event.preventDefault();
        alert("Action not allowed during the test.");
    }
});

const testDuration = 10 * 60;
let timerElement = document.getElementById("timer");
function startTimer(duration) {
    let remainingTime = duration;
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! The test has been locked.");
            document.getElementById('test-container').style.display = "none";
            document.getElementById('result').style.display = "block";
        }
        remainingTime--;
    }, 1000);
}
startTimer(testDuration);
