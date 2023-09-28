var currentInput = ""; 
var expression = ""; 
var show = "";
var result = 0; 
var trifucflag = false;
var setInfo = function () {
    Info.innerHTML = show;
}
var onNumClicked = function (num) {
        currentInput += num;
        show += num;
        setInfo();

}
var onOpClick = function (op) {
    if (currentInput !== "") {

        if (trifucflag) {
            var inputValue = parseFloat(currentInput);
            if (!isNaN(inputValue)) {
                expression += inputValue
                currentInput = "";
            }
        }
        else {
            expression += currentInput;
        }
    }
    if (op == 'sin' || op == 'cos' || op == 'tan') {
        trifucflag = true;
        expression += "Math." + op;
        show += op;
    } else if (op == 'asin' || op == 'acos' || op == 'atan') {
        expression += "Math." + op;
        show += op;
    }else if(op=='PI'){
        expression+="Math."+op;
        show+="π";
    }else if(op=='ln'){
        expression+="Math."+"log"
        show+=op
    }else if(op=='√'){
        expression+="Math."+"sqrt"
        show+=op;
    }else if (op == '!') {
        var a = factorial(currentInput);
        show+=op
        expression = a.toString();
    }else if(op=='**'){
        expression+=op
        show+="^"
    }
    else {
        expression += op;
        show += op;
    }
    currentInput=""
    setInfo();
}
var onDecimalPointClick = function () {
    if (currentInput.indexOf(".") === -1) {
        currentInput += ".";
        show += ".";
        setInfo();
    }
}
var onEqualClick = function () {


    if (currentInput !== "") {
        expression += currentInput; 
        currentInput = "";
    }
    try {
        expression = expression.replace(/×/, "*");
        expression = expression.replace(/ln/, "log");

       
        expression = expression.replace(/Math\.asin\((.*?)\)/g, function (match, p1) {
            var resultInRadians = eval("Math.asin(" + p1 + ")");
            return resultInRadians;
        });

        expression = expression.replace(/Math\.acos\((.*?)\)/g, function (match, p1) {
            var resultInRadians = eval("Math.acos(" + p1 + ")");
            return resultInRadians ;
        });

        expression = expression.replace(/Math\.atan\((.*?)\)/g, function (match, p1) {
            var resultInRadians = eval("Math.atan(" + p1 + ")");
            return resultInRadians;
        });

        result = eval(expression); 
        result=roundFun(result, 10)

        expression = result.toString();

        show = expression;
        setInfo();
    } catch (error) {
        Info.innerHTML = "Error"; 
        expression = ""; 
    }
}
var onClicked = function () {
    currentInput = "";
    expression = "";
    result = 0;
    Info.innerHTML = "0"
    show = ""
    trifucflag=false
}
var onBackspaceClick = function () {
    if(show.length==1||show.length<1){
        Info.innerHTML="0"
        show=""
        expression=""
        currentInput=""
    }else {
        currentInput = currentInput.slice(0, -1); 
        show = show.slice(0, -1);
        expression=expression.slice(0,-1)
        setInfo();
    }
}
function roundFun(value, n) {
    return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
}
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
document.addEventListener('keydown', function(event) {
   
    const key = event.key;

    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            onNumClicked(key);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            onOpClick(key);
            break;
        case 'Enter':
            onEqualClick();
            break;
        case 'Escape':
            onClicked('C');
            break;
        case 'Backspace':
            onBackspaceClick()
            break;
    }
});
document.getElementById('Info').focus();
