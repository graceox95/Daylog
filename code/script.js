/*
function whatIsBigger(n1, n2){
    if( n1 > n2 ){
        return n1
    }else{
        return n2
    }
}

console.log(whatIsBigger(3, 5))

function eat(what, howMany){
    for(let i = 1; i <= howMany; i += 1){
        console.log(what)
    }
}

eat("밥", 3)
eat("간식", 5)

function oddOrEven(number){
    if(number % 2 == 0){
        return "짝수"
    }else{
        return "홀수"
    }
}

console.log(oddOrEven(10))
console.log(oddOrEven(99))


//다음은 16. 이벤트 그리고 이벤트 핸들러 장 실습 내용임.
//총 3 단계로 실습 진행함.
//1단계: html에서 생성한  text칸과 button칸을 js파일 안에서도 상수로 지정.(연결함.)
const inputText = document.querySelector("#text")
const inputButton = document.querySelector("#button")
//2단계: 향후 사용할 함수 만듦.
function handleText(){
    console.log("타이핑이 되고 있어요!")
}
function handleButton(){
    console.log("버튼을 눌렀어요!")
}
//상수로 연결해둔 것을 ~하면(이벤트 핸들러) 함수를 실행한다.
inputText.onkeydown = handleText
inputButton.onclick = handleButton

const inputButton2 = document.querySelector("#button2")
function handleButton2(){
    window.alert("버튼을 눌렀네요!")
}
inputButton2.onclick = handleButton2


//여기선 addEvenListener 기능을 활용해서 위와 똑같은 결과를 만드는 연습임.
//이게 더 편하다고 느낀 게 위에선 단계를 총 3가지로 진행했는데,
//여기서는 2단계로, 연결하기(1) 이후 기능 선택 및 함수 설정(2)으로 진행되기 때문임. (위 처럼 3단계로 진행하는 것도 당연히 가능함.)
const inputButton3 = document.querySelector("#button3")
inputButton3.addEventListener('click', function handleButton3(){
    window.alert("공지입니다.")
})

const button = document.querySelector("#push")
const pTag = document.querySelector("#area")
button.addEventListener("click", function add(){
    console.log("p태그 생성 중!")
    const newP = document.createElement("p")

    newP.style.backgroundColor = "green"
    newP.style.width = "300"
    newP.style.height = "300"
    newP.style.border = "1px solid black"

    pTag.appendChild(newP)
})

const form = document.querySelector("form")
form.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(form.name.value)
    console.log(form.age.value)
})

let result;
result = 3>2 ? "true" : "false"
console.log(result)

const select = document.querySelector("select")
const button5 = document.querySelector("#button5")
button5.addEventListener("click", function(){
    console.log(select.value)
    let pickResult;
    pickResult = select.value = "watermelon" ? "수박을 제일 좋아하는 군요!" : "수박을 제일 좋아하진 않는군요.."
    console.log(pickResult)
})

setTimeout(function(){
    console.log("10초가 지났습니다.")
}, 10000)

const h1 = document.querySelector("h1")
const addBtn = document.querySelector("#add")
const removeBtn = document.querySelector("#remove")
const toggleBtn = document.querySelector("#toggle")

addBtn.addEventListener("click", function(){
    h1.classList.add("text")
})
removeBtn.addEventListener("click", function(){
    h1.classList.remove("text")
})
toggleBtn.addEventListener("click", function(){
    h1.classList.toggle('text')
})

const myName = localStorage.getItem("myName")
console.log(myName)
*/


function toggleBtn(){
    const password = document.querySelector(".textPassword")
    const toggleBtn = document.querySelector(".toggleBtn")

    if(password.type === "password"){
        password.type = "text"
        toggleBtn.src = "../images/toggleBtn2.png"
    } else {
        password.type = "password"
        toggleBtn.src = "../images/toggleBtn.png"
    }
}

function agreeAllPolicy(){
    const policy1 = document.querySelector("#agreeTerms")
    const policy2 = document.querySelector("#agreePrivacy")
    const policy3 = document.querySelector("#agreeDataCollection")

    const policy1Checked = policy1.checked
    const policy2Checked = policy2.checked
    const policy3Checked = policy3.checked

    const email = document.querySelector(".textEmail")
    const password = document.querySelector(".textPassword")

    if(policy1Checked && policy2Checked && policy3Checked
        && email.value.includes("@") && password.value.length > 0){
        fetch("/signUp", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ email: email.value, password: password.value})
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                window.location.href = "/home"
            } else {
                alert(data.message || "Please agree to all policies")
            }
        })
    }
}

function handleSignIn(){
    const email = document.querySelector(".textEmail")
    const password = document.querySelector(".textPassword")

    fetch("/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email: email.value, password: password.value})
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            window.location.href = "/home"
        } else {
            alert(data.message || "로그인에 실패했습니다.")
        }
    })
}

// 버튼 활성화 상태 확인 및 업데이트
function checkSignUpButton(){
    const policy1 = document.querySelector("#agreeTerms")
    const policy2 = document.querySelector("#agreePrivacy")
    const policy3 = document.querySelector("#agreeDataCollection")
    const email = document.querySelector(".textEmail")
    const password = document.querySelector(".textPassword")
    const signUp = document.querySelector(".signUp")

    const isValid = policy1.checked && policy2.checked && policy3.checked
        && email.value.includes("@") && password.value.length > 0

    if(isValid){
        signUp.style.opacity = "1"
        signUp.style.cursor = "pointer"
    } else {
        signUp.style.opacity = "0.5"
        signUp.style.cursor = "not-allowed"
    }
}

// 홈 화면 오늘 날짜 표시
document.addEventListener("DOMContentLoaded", function(){
    const todayDate = document.querySelector("#todayDate")
    if(!todayDate) return

    todayDate.textContent = new Date().toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric", weekday: "long"
    })
})

// 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", function(){
    const email = document.querySelector(".textEmail")
    const password = document.querySelector(".textPassword")
    const policy1 = document.querySelector("#agreeTerms")
    const policy2 = document.querySelector("#agreePrivacy")
    const policy3 = document.querySelector("#agreeDataCollection")

    if(!email || !password || !policy1 || !policy2 || !policy3) return

    email.addEventListener("input", checkSignUpButton)
    password.addEventListener("input", checkSignUpButton)
    policy1.addEventListener("change", checkSignUpButton)
    policy2.addEventListener("change", checkSignUpButton)
    policy3.addEventListener("change", checkSignUpButton)

    checkSignUpButton()
})