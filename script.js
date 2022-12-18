let formStatus="personalInfo";

const steps=document.querySelectorAll(".step");
const mainSteps=document.querySelectorAll(".main-step");

// Controll Moving between Steps -- START

const [backBtn,nextBtn,confirmBtn]=document.querySelectorAll(".footer button");
backBtn.addEventListener("click",()=>toggleSteps("back"));
nextBtn.addEventListener("click",()=>toggleSteps("next"))

function toggleSteps(direction){
    const check=formStatus==="personalInfo"?validatePersonalInfo():"NO_NEED_FOR_VALIDATION";
    if(!check)
        return 0;
    const active_step=document.querySelector(".step.active");
    const active_main_step=document.querySelector(".main-step.active");
    const active_index=[...steps].indexOf(active_step);
    if(direction==="back" && active_index===0)
        return 0;
    const step=direction==="back"?-1:1;
    active_step.classList.toggle("active");
    active_main_step.classList.toggle("active");
    steps[active_index+step].classList.toggle("active");
    mainSteps[active_index+step].classList.toggle("active");
    if((step+active_index)===3){
        nextBtn.classList.toggle("hidden");
        confirmBtn.classList.toggle("hidden");
    }else if(nextBtn.classList.contains("hidden")){
        nextBtn.classList.toggle("hidden");
        confirmBtn.classList.toggle("hidden");
    }
}

// Controll Moving between Steps -- END

// Personal Info Validation -- START

const inputFields=document.querySelectorAll(".inputField");
const personalInput=[...document.querySelectorAll(".inputField input")];

const personalInfo={
    name:"",
    email:"",
    phone:""
};
personalInput.forEach(input=>input.addEventListener("keyup",hanldePersonalInputChange));

function hanldePersonalInputChange({target:{value,name,parentNode}}){
    personalInfo[name]=value;
    parentNode.classList.remove("error");
    formStatus="personalInfo";
}

function validatePersonalInfo(){
    let status=true;
    const info=Object.entries(personalInfo);
    info.forEach((data,index)=>{
        if(data[0]!=="email" && !data[1]){
            inputFields[index].classList.add("error");
            status=false;
        }
        if(data[0]==="email"){
            const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
            if(!regex.test(data[1] || !data[1])){
                inputFields[index].classList.add("error");
                status=false;
            };
        }
    })
    return status;
}

// Personal Info Validation -- END

// Selecting Plan & Toggle billing -- START

const billingToggle=document.querySelector(".billing-toggle input");
const monthly=document.querySelector("label.monthly")
const yearly=document.querySelector("label.yearly");
const planPrices=document.querySelectorAll(".plan-price");
let billing="monthly";
const monthlyBilling=[9,12,15];
const yearlyBilling=[90,120,150];

billingToggle.addEventListener("change",()=>{
    monthly.classList.toggle("active");
    yearly.classList.toggle("active");
    billing=billing==="monthly"?"yearly":"monthly";
    planPrices.forEach((planPrice,index)=>{
        const price=billing==="monthly"?`$${monthlyBilling[index]}/mo`:`$${yearlyBilling[index]}/yr`;
        planPrice.textContent=price;
        billing==="monthly"?planPrice.classList.remove("yearly"):planPrice.classList.add("yearly");
    })
});

// Selecting Plan & Toggle billing -- END