const inputSlider = document.querySelector("[handel-slider]")
const lengthDisplay = document.querySelector("[data-length]");
const passwordDisplay = document.querySelector("[password-data]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indictor = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '!<@#$%^&*()_+';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider()
setIndictor("#ccc");

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =((passwordLength-min)*100/(max-min)+"% 100%" )}

function setIndictor(color) {
    indictor.style.background = color;

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRadomNumber() {
    return getRndInteger(0.9);

}
function generateLowercase() {
    return String.fromCharCode(getRndInteger(97, 123))
}

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65, 91))
}

function generateSymbol() {
    const randomNumber = getRndInteger(0, symbols.length);
    return symbols.charAt(randomNumber);
}
function calStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndictor("#0f0");
    }
    else if (
        (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndictor("#ff0");
    }
    else {
        setIndictor("#f00");
    }

}
function shufflePassword(array) {
    //fisher yates method
    for (let i = Array.length - 1; i > 0; i--) {
        const j = math.floor(math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = ""
    array.forEach((el) => (str += el));
    return str;
}
console.log("suffle")
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });
    // spacial condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider()
    }
}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();

});

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected
    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";
    console.log("genertae")
    //  //lets put the stuff 
    //  if(uppercaseCheck.checked){
    //     password<=generateUppercase();
    //  }
    //  if(lowercaseCheck.checked){
    //     password<=generatelowerrcase();
    //  }
    //  if(numberCheck.checked){
    //     password<=generateRadomNumber();
    //  }
    //  if(symbolCheck.checked){
    //     password<=generateSymbol();
    //  }
    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(generateUppercase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowercase);

    }
    if (numberCheck.checked) {
        funcArr.push(generateRadomNumber);
    }
    if (symbolCheck.checked) {
        funcArr.push(generateSymbol);
    }
    //compulsory addition 
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("comulsory")
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    //
    password = shufflePassword(array.form(password));
    //show in ui
    passwordDisplay.value = password;
    //calculate strength
    calStrength();
});