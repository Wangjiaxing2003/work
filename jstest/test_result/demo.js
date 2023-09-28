var currentInput = ""; 
var expression = ""; 
var show = "";
var result = 0; 
var trifucflag = false;
var setInfo = function () {
    document.getElementById('Info').innerHTML = show;
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
            expression += inputValue
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
    currentInput = "";
    setInfo();
}
var onDecimalPointClick = function () {
        currentInput += ".";
        show += ".";
        setInfo();
}
var onEqualClick = function () {
    if (currentInput !== "") {
        expression += currentInput; 
        currentInput = "";
    }
    try {
        expression = expression.replace(/×/, "*");

       
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
        document.getElementById('Info').innerHTML = "Error"; 
        expression = ""; 
    }
}
var onClicked = function () {
    currentInput = "";
    expression = "";
    result = 0;
    document.getElementById('Info').innerHTML="0"
    show = ""
    trifucflag=false
}
var onBackspaceClick = function () {
    
        currentInput = currentInput.slice(0, -1); 
        show = show.slice(0, -1);
        expression=expression.slice(0,-1)
        setInfo();
   
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

module.exports = {
    setInfo,
    roundFun,
    onNumClicked,
    onOpClick,
    onDecimalPointClick,
    onEqualClick,
    onClicked,
    onBackspaceClick,
    factorial
}
