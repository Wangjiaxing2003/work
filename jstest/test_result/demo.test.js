const {JSDOM} = require('jsdom');

const jsDomIntance = new JSDOM(`
<!DOCTYPE html>
<body>
    <div class="frame">
        <div class="title">计算器</div>
        <div class="display-box" id="Info">0</div>
        <div class="main">
            <div class="row">
                <div class="btn" onclick="onNumClicked('1')">1</div>
                <div class="btn" onclick="onNumClicked('2')">2</div>
                <div class="btn" onclick="onNumClicked('3')">3</div>
                <div class="btn" onclick="onOpClick('**')">x^</div>
                <div class="btn" onclick="onBackspaceClick()">⬅</div>
                <div class="btn" onclick="onOpClick('sin')">sin</div>
                <div class="btn" onclick="onOpClick('asin')">asin</div>
            </div>
            <div class="row">
                <div class="btn" onclick="onNumClicked('4')">4</div>
                <div class="btn" onclick="onNumClicked('5')">5</div>
                <div class="btn" onclick="onNumClicked('6')">6</div>
                <div class="btn" onclick="onOpClick('(')">(</div>
                <div class="btn" onclick="onOpClick(')')">)</div>
                <div class="btn" onclick="onOpClick('cos')">cos</div>
                <div class="btn" onclick="onOpClick('acos')">acos</div>
                <div class="btn" onclick="onOpClick('!')">x!</div>
            </div>
            <div class="row">
                <div class="btn" onclick="onNumClicked('7')">7</div>
                <div class="btn" onclick="onNumClicked('8')">8</div>
                <div class="btn" onclick="onNumClicked('9')">9</div>
                <div class="btn" onclick="onOpClick('+')">+</div>
                <div class="btn" onclick="onOpClick('-')">-</div>
                <div class="btn" onclick="onOpClick('tan')">tan</div>
                <div class="btn" onclick="onOpClick('atan')">atan</div>
                <div class="btn" onclick="onOpClick('√')">√x</div>
            </div>
            <div class="row">
                <div class="btn" onclick="onNumClicked(0)">0</div>
                <div class="btn" onclick="onClicked('C')">C</div>
                <div class="btn" onclick="onDecimalPointClick('.')">.</div>
                <div class="btn" onclick="onOpClick('×')">×</div>
                <div class="btn" onclick="onOpClick('/')">÷</div>
                <div class="btn" onclick="onOpClick('ln')">log</div>
                <div class="btn" onclick="onOpClick('PI')">π</div>
                <div class="btn" onclick="onEqualClick()">=</div>
            </div>
        </div>
    </div>
</body>
</html>
`)
const window = jsDomIntance.window; // window 对象
const document = window.document; // document 对象
global.document = document;

const {setInfo,
    roundFun,
    onNumClicked,
    onOpClick,
    onDecimalPointClick,
    onEqualClick,
    onClicked,
    onBackspaceClick,
    factorial} = require("./demo.js")

test("test 1 + 7 = 8", () => {

    onClicked()//引用函数1
    onNumClicked('1')
    onOpClick('+')
    onNumClicked('7')
    expect( document.getElementById('Info').innerHTML).toBe("1+7");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("8");
//expect( document.getElementById('Info')).toBe("8")
})
test("2.3 + 4.5 = 6.8", () => {
    onClicked()
    onNumClicked('2')
    onDecimalPointClick()//.
    onNumClicked('3')
    onOpClick('+')
    onNumClicked('4')
    onDecimalPointClick()//.
    onNumClicked('5')
    expect( document.getElementById('Info').innerHTML).toBe("2.3+4.5");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("6.8");
})
test("2.3 - 1.1 = 1.2", () => {
    onClicked()
    onNumClicked('2')
    onDecimalPointClick()//.
    onNumClicked('3')
    onOpClick('-')
    onNumClicked('1')
    onDecimalPointClick()//.
    onNumClicked('1')
    expect( document.getElementById('Info').innerHTML).toBe("2.3-1.1");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("1.2");
})
test("-3-2=-5", () => {
    onClicked()
    onOpClick('-')
    onNumClicked('3')
    onOpClick('-')
    onNumClicked('2')
    expect( document.getElementById('Info').innerHTML).toBe("-3-2");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("-5");
})
test("√(9)=3", () => {
    onClicked()
    onOpClick('√')
    onOpClick('(')
    onNumClicked('9')
    onOpClick(')')
    expect( document.getElementById('Info').innerHTML).toBe("√(9)");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("3");
})
test("4!=24", () => {
    onClicked()
    onNumClicked('4')
    onOpClick('!')
    expect( document.getElementById('Info').innerHTML).toBe("4!");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("24");
})
test("sin(π/6)=0.5", () => {
    onClicked()
    onOpClick('sin')
    onOpClick('(')
    onOpClick('PI')
    onOpClick('/')
    onNumClicked('6')
    onOpClick(')')
    expect( document.getElementById('Info').innerHTML).toBe("sin(π/6)");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("0.5");
})
test("2/0='Infinity'", () => {
    onClicked()
    onNumClicked('2')
    onOpClick('/')   
    onNumClicked('0')
    expect( document.getElementById('Info').innerHTML).toBe("2/0");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("Infinity");
})
test("atan(0)=0", () => {
    onClicked()
    onOpClick('atan')
    onOpClick('(') 
    onNumClicked('0')
    onOpClick(')')  
    expect( document.getElementById('Info').innerHTML).toBe("atan(0)");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("0");
})
test("ln(10)=2.302585093", () => {
    onClicked()
    onOpClick('ln')
    onOpClick('(') 
    onNumClicked('10')
    onOpClick(')')  
    expect( document.getElementById('Info').innerHTML).toBe("ln(10)");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("2.302585093");
})
test("3+3×6=21", () => {
    onClicked()
    onNumClicked('3')
    onOpClick('+')
    onNumClicked('3') 
    onOpClick('×')
    onNumClicked('6')
    expect( document.getElementById('Info').innerHTML).toBe("3+3×6");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("21");
})
test("3^3=27", () => {
    onClicked()
    onNumClicked('3')
    onOpClick('**')
    onNumClicked('3') 
    expect( document.getElementById('Info').innerHTML).toBe("3^3");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("27");
})
test("(2+3)^2=25", () => {
    onClicked()
    onOpClick('(')
    onNumClicked('2')
    onOpClick('+')
    onNumClicked('3')
    onOpClick(')') 
    onOpClick('**')
    onNumClicked('2')
    expect( document.getElementById('Info').innerHTML).toBe("(2+3)^2");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("25");
})
test("Back", () => {
    onClicked()
    onNumClicked('2')
    onNumClicked('3')
    onBackspaceClick()
    expect( document.getElementById('Info').innerHTML).toBe("2");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("2");
})
test("π=3.1415926536", () => {
    onClicked()
    onOpClick('PI')
    expect( document.getElementById('Info').innerHTML).toBe("π");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("3.1415926536");
})
test("Clear", () => {
    onClicked()
    onNumClicked('2')
    onNumClicked('3') 
    expect( document.getElementById('Info').innerHTML).toBe("23");
    onClicked()
    expect( document.getElementById('Info').innerHTML).toBe("0");
})
test("asin(0.5)=0.5235987756", () => {
    onClicked()
    onOpClick('asin')
    onOpClick('(') 
    onNumClicked('0.5')
    onOpClick(')')  
    expect( document.getElementById('Info').innerHTML).toBe("asin(0.5)");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("0.5235987756");
})
test("acos(0)=1.5707963268", () => {
    onClicked()
    onOpClick('acos')
    onOpClick('(') 
    onNumClicked('0')
    onOpClick(')')  
    expect( document.getElementById('Info').innerHTML).toBe("acos(0)");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("1.5707963268");
})
test("sin(2=Error", () => {
    onClicked()
    onOpClick('sin')
    onOpClick('(') 
    onNumClicked('2') 
    expect( document.getElementById('Info').innerHTML).toBe("sin(2");
    onEqualClick()
    expect( document.getElementById('Info').innerHTML).toBe("Error");
})