let formStatus="personalInfo";
let billing="monthly";
let total=0;
const totalPrice=document.querySelector(".addOn.total .addOn-price");
const totalBillingType=document.querySelector(".addOn.total .billing-total");
const selectedPlan=document.querySelector(".plan-name");
const billingType=document.querySelector(".billing-type");
const change=document.querySelector(".change");
const planPrice=document.querySelector(".step4 .plan-price");
const planAddOns=document.querySelector(".addOns");
const steps=document.querySelectorAll(".step");
const mainSteps=document.querySelectorAll(".main-step");
const footer=document.querySelector(".footer");

// Controll Moving between Steps -- START

const [backBtn,nextBtn,confirmBtn]=document.querySelectorAll(".footer button");
backBtn.addEventListener("click",()=>toggleSteps("back"));
nextBtn.addEventListener("click",()=>toggleSteps("next"))

change.addEventListener("click",moveToChangePlan);

confirmBtn.addEventListener("click",()=>{
    footer.classList.toggle("hidden");
    const confirmation=document.querySelector(".confirmation");
    const active_step=document.querySelector(".main-step.active");
    active_step.classList.toggle("active");
    confirmation.classList.toggle("hidden");
    const container=document.querySelector(".content");
    container.classList.toggle("center");
});

function moveToChangePlan(){
    const active_step=document.querySelector(".step.active");
    const active_main_step=document.querySelector(".main-step.active");
    active_step.classList.toggle("active");
    active_main_step.classList.toggle("active");
    steps[1].classList.toggle("active");
    mainSteps[1].classList.toggle("active");
    nextBtn.classList.toggle("hidden");
    confirmBtn.classList.toggle("hidden");
}

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
    total=calculateTotal();
    totalPrice.textContent=`$${total}/${billing==="monthly"?"mo":"yr"}`;
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

// Picking add-ons -- START

const monthlyAddOns=[1,2,2];
const yearlyAddOns=[10,20,20];

const addOns=[...document.querySelectorAll(".add-on input")];
const addOnsPrices=[...document.querySelectorAll(".add-on-price")];

addOns.forEach((addOn)=>addOn.addEventListener("change",()=>{
    planAddOns.innerHTML="";
    managingAddOns();
    total=calculateTotal();

}));

function managingAddOns(){
    planAddOns.innerHTML="";
    addOns.forEach((addon,index)=>{
        if(!addon.checked)
            return ;
        const addOnCont=document.createElement("span");
        addOnCont.className="addOn";

        const addOnTitle=document.createElement("span");
        addOnTitle.className="addOn-title";
        addOnTitle.textContent=addon.name;

        const addOnPrice=document.createElement("span");
        addOnPrice.className="addOn-price";
        addOnPrice.textContent=billing==="monthly"?`+$${monthlyAddOns[index]}/mo`:`+$${yearlyAddOns[index]}/yr`;

        addOnCont.append(addOnTitle,addOnPrice);
        planAddOns.appendChild(addOnCont);

    })
}

// Picking add-ons -- END

// Selecting Plan & Toggle billing -- START

const plans=[...document.querySelectorAll(".plan")];
let activePlan=document.querySelector(".plan.active");
const billingToggle=document.querySelector(".billing-toggle input");
const monthly=document.querySelector("label.monthly")
const yearly=document.querySelector("label.yearly");
const planPrices=document.querySelectorAll(".plan-price");
const monthlyBilling=[9,12,15];
const yearlyBilling=[90,120,150];

planPrice.textContent=billing==="monthly"?`$${monthlyBilling[0]}/mo`:`$${yearlyBilling[0]}/yr`;
totalBillingType.textContent=billing==="monthly"?"month":"year";

plans.forEach((plan,index)=>{
    plan.addEventListener("click",function(){
        activePlan.classList.remove("active");
        this.classList.add("active");
        activePlan=this;
        selectedPlan.textContent=`${activePlan.id} (${capital(billing)})`;
        planPrice.textContent=billing==="monthly"?`$${monthlyBilling[index]}/mo`:`$${yearlyBilling[index]}/yr`;
        total=calculateTotal();
    })
})

billingToggle.addEventListener("change",()=>{
    monthly.classList.toggle("active");
    yearly.classList.toggle("active");
    billing=billing==="monthly"?"yearly":"monthly";
    planPrices.forEach((planPrice,index)=>{
        const price=billing==="monthly"?`$${monthlyBilling[index]}/mo`:`$${yearlyBilling[index]}/yr`;
        planPrice.textContent=price;
        billing==="monthly"?planPrice.classList.remove("yearly"):planPrice.classList.add("yearly");
    });
    addOnsPrices.forEach((addOnPrice,index)=>{
        const price=billing==="monthly"?`$${monthlyAddOns[index]}/mo`:`$${yearlyAddOns[index]}/yr`;
        addOnPrice.textContent=price;
    });
    
    const index=plans.indexOf(activePlan);
    planPrice.textContent=billing==="monthly"?`$${monthlyBilling[index]}/mo`:`$${yearlyBilling[index]}/yr`;

    selectedPlan.textContent=`${activePlan.id} (${capital(billing)})`;
    total=calculateTotal();
    totalBillingType.textContent=billing==="monthly"?"month":"year";
    
    managingAddOns();
});

// Selecting Plan & Toggle billing -- END

// Finishing up -- START



// Finishing up -- END

function calculateTotal(){
    const planPrice=billing==="monthly"?monthlyBilling[plans.indexOf(activePlan)]:yearlyBilling[plans.indexOf(activePlan)];
    const addOnsPrice=addOns.reduce(function(acc,addOn){
        const price=billing==="monthly"?monthlyAddOns[addOns.indexOf(addOn)]:yearlyAddOns[addOns.indexOf(addOn)];
        if(addOn.checked)
            return acc+price;
        return acc;
    },0)
    return planPrice+addOnsPrice;
}

function capital(string=""){
    const newChar=string[0].toUpperCase();
    return newChar+string.slice(1);
}