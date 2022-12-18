let formStatus="personalInfo";

const steps=document.querySelectorAll(".step");

// Controll Moving between Steps -- START

const [backBtn,nextBtn,confirmBtn]=document.querySelectorAll(".footer button");
backBtn.addEventListener("click",()=>toggleSteps("back"));
nextBtn.addEventListener("click",()=>toggleSteps("next"))

function toggleSteps(direction){
    const check=formStatus==="personalInfo"?validatePersonalInfo():"NO_NEED_FOR_VALIDATION";
    if(!check)
        return 0;
    const active_step=document.querySelector(".step.active");
    const active_index=[...steps].indexOf(active_step);
    if(direction==="back" && active_index===0)
        return 0;
    const step=direction==="back"?-1:1;
    active_step.classList.toggle("active");
    steps[active_index+step].classList.toggle("active");
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
            console.log(data[0]!=="email")
        }
        if(data[0]==="email"){
            const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
            if(!regex.test(data[1] || !data[1])){
                inputFields[index].classList.add("error");
                status=false;
            };
        }
        return status;
    })
}

// Personal Info Validation -- END