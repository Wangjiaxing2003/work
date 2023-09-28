# HTML+CSS+Javascript实现计算器

## 作业要求

https://bbs.csdn.net/topics/617294583

## 项目源码地址

https://github.com/Wangjiaxing2003/work

## 0. 界面及功能展示

![](E:\video\动画.gif)

## 1. PSP表格

| PSP                                     | Personal Software Process Stages        | 预估耗时（分钟） | 实际耗时（分钟） |
| --------------------------------------- | --------------------------------------- | ---------------- | ---------------- |
| Planning                                | 计划                                    | 60               | 80               |
| • Estimate                              | • 估计这个任务需要多少时间              | 30               | 30               |
| Development                             | 开发                                    | 420              | 500              |
| • Analysis                              | • 需求分析 (包括学习新技术）            | 60               | 40               |
| • Design Spec                           | • 生成设计文档                          | 60               | 40               |
| • Design Review                         | • 设计复审                              | 30               | 20               |
| • Coding Standard                       | • 代码规范 (为目前的开发制定合适的规范) | 60               | 30               |
| • Design                                | • 具体设计                              | 60               | 80               |
| • Coding                                | • 具体编码                              | 300              | 320              |
| • Code Review                           | • 代码复审                              | 60               | 50               |
| • Test                                  | • 测试（自我测试，修改代码，提交修改）  | 40               | 80               |
| Reporting                               | 报告                                    | 90               | 100              |
| • Test Repor                            | • 测试报告                              | 60               | 40               |
| • Size Measurement                      | • 计算工作量                            | 20               | 20               |
| • Postmortem & Process Improvement Plan | • 事后总结, 并提出过程改进计划          | 20               | 20               |
|                                         | 合计                                    | 1370             | 1450             |

## 2. 解题思路描述

1. 要想让计算器可视化，最好的方法便是选择前端语言，而HTML+CSS+JavaScript对于设计一个简单的计算器界面非常方便，于是选用其来实现。
2. 要想让输入的数字或符号准确的展示在计算器页面上，最好的方法便是字符进行相加处理，而JavaScript正好提供了这种功能。
3. 要对输入的一串字符进行运算，可以直接利用到js自带的eval函数来对字符串内的数字和运算符进行运算，但要考虑到一些特殊情况，例如三角函数和反三角函数。

## 3. 设计实现过程

### 1.HTML结构

```
<div class="frame">
        <div class="title">计算器</div>
        <div class="display-box" id="Info">0</div>
        <div class="main">
            <div class="row">
                <div class="btn" onclick="onNumClicked('1')">1</div>
                						⁞
                						⁞
                						⁞
                <div class="btn" onclick="onOpClick('asin')">asin</div>
            </div>
            <div class="row">
                <div class="btn" onclick="onNumClicked('4')">4</div>
               							⁞
               							⁞
                <div class="btn" onclick="onOpClick('!')">x!</div>
            </div>
            <div class="row">
                <div class="btn" onclick="onNumClicked('7')">7</div>
                						⁞
                						⁞
                <div class="btn" onclick="onOpClick('√')">√x</div>
            </div>
            <div class="row">
                <div class="btn" onclick="onNumClicked(0)">0</div>
                						⁞
               	 						⁞
                <div class="btn" onclick="onEqualClick()">=</div>                
            </div>
        </div>
    </div>
```

### 2.CSS样式

设计了按钮颜色，点击的指示图样以及鼠标悬停时的阴影特效

```
<style>
        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .frame {
            border: 1px solid blue;
            margin-top: 80px;
            height: 450px;
            width: 500px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            background-color: gainsboro
        }
        .title {
            border: 1px solid dimgray;
            padding: 10px;
            font-size: 20px;
            text-align: center;
        }
        .display-box {
            border: 1px solid black;
            padding: 10px;
            text-align: right;
        }
        .main {
            border: 1px solid dimgray;
            padding: 5px;
            display: flex;
            flex-direction: column;
        }
        .row {
            display: flex;
            justify-content: space-around;
            margin-bottom: 5px;
            padding: 5px;
        }
        .btn {
            border: 1px solid black;
            width: 30px;
            height: 30px;
            font-size: 16px;
            text-align: center;
            padding: 9px;
            border-radius: 10px;
            background-color: antiquewhite;
        }
        .btn:hover {
            color: black;
            background-color: gray;
            cursor: pointer;
        }
    </style>
```

### 3.Javascript代码逻辑

将点击的数字和符号添加到要计算的表达式和显示的表达式中，并在处理符号函数中对三角和反三角函数进行特殊处理

```
var currentInput = ""; //输入的数字
var expression = ""; //运算表达式
var show = ""; //显示表达式
var result = 0; //运算结果
var trifucflag = false;
//点击数字处理函数
var onNumClicked = function (num) {
        currentInput += num;
        show += num;
        setInfo();

}
//点击符号时处理函数
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
```

对小数点，清零和后退符号单独考虑和处理

```
//处理小数点
var onDecimalPointClick = function () {
    if (currentInput.indexOf(".") === -1) {
        currentInput += ".";
        show += ".";
        setInfo();
    }
}
//处理清零
var onClicked = function () {
    currentInput = "";
    expression = "";
    result = 0;
    Info.innerHTML = "0"
    show = ""
    trifucflag=false
}
//处理后退
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
```

当点击等号时，对特殊的运算符进行处理，js自带的eval函数对表达式进行运算，并对可能出现的小数精度问题进行处理，用正则法则处理表达式中出现的反三角函数

```
//点击等号时的处理
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
```

为了方便用户使用，添加了用户可从键盘输入的功能

```
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
```

用HTML2EXE生成exe文件

![image-20230928200437637](C:\Users\王嘉星\AppData\Roaming\Typora\typora-user-images\image-20230928200437637.png)

## 4. 程序性能改进

1. 小数精度导致显示问题改进

   在最开始测试中，0.6*3=1.799999998，后来发现是精度问题导致显示异常，于是我添加一个roundFun函数来处理这类小数，同时对运算的最后结果若是浮点数保留10位小数。

2. 代码排版改进

   在最开始写程序时，我将符号操作一个个单独拿出来作为一个函数再传给处理符号的函数，这样过于繁琐，于是我删去了符号函数，在页面点击事件中直接将符号传递给处理符号函数。

## 5. 单元测试展示

Javascript带有jest测试框架

在测试项目文件目录下的package.json内容

![image-20230928234958998](C:\Users\王嘉星\AppData\Roaming\Typora\typora-user-images\image-20230928234958998.png)

部分测试代码

![image-20230928234925388](C:\Users\王嘉星\AppData\Roaming\Typora\typora-user-images\image-20230928234925388.png)

构造测试数据，将计算器的运算符都要用上，另外要注意一下比较少见的数据，代码覆盖率：

![image-20230928232717763](C:\Users\王嘉星\AppData\Roaming\Typora\typora-user-images\image-20230928232717763.png)

## 6. 心路历程与收获

 	在最初开始构思这个计算器并写出计算器的可视化界面，到写出最简单的加减乘除功能，再到后面对计算器功能的不断完善，在这个过程中，我从入门html+css+js，到现在的了解这门语言的大致基本结构。在写这个计算器时也遇到过许多困难，通过查阅资料和别人的帮助最终也是得到解决，在问题迟迟不被解决时也想过放弃，但最终还是坚持了下来。

​	从这个开发计算器的小项目，我学会了如何利用HTML和CSS来设计一个美观的可视化界面，学会了js中事件的联系，懂得了如何在github上创建仓库和在如何本地上传文件到仓库中，此外，意外的收获是自己学会了如何利用jest去测试自己的代码和覆盖率。总之，从这次的作业中我受益匪浅。