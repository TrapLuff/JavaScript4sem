// файл script.js

window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        if((b!=="") && (selectedOperation == '+')){
            a = ((+a)+(+b)).toString()
            b = ''
        }
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        if((b!=="") && (selectedOperation == '-')){
            a = ((+a)-(+b)).toString()
            b = ''
        }
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // кнопка смены знака (1)
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a = a)
            { a = (-a).toString();}
            else { a = ''; }
            outputElement.innerHTML = a;
        } else {
            b = b ? (-b).toString() : '';
            if (b = b)
                { b = (-b).toString();}
            else { b = ''; }
            outputElement.innerHTML = b;
        }
    }

     // кнопка вычисления процента (2)
     document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a = a)
            { a = (a / 100).toString();}
            else { a = ''; }
            outputElement.innerHTML = a;
        } else {
            b = b ? (-b).toString() : '';
            if (b = b)
                { b = (b / 100).toString();}
            else { b = ''; }
            outputElement.innerHTML = b;
        }
    }

    //кнопка удаления последней цифры (3)
    document.getElementById("btn_op_backspace").onclick = function()  {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || 0;
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || 0;
        }
    }

    //кнопка смены темы (4)
    document.getElementById("themeToggle").onclick = function(){
        document.body.classList.toggle('white-theme');  
    }
    
    //вычисление квадратного корня (5)
    document.getElementById("btn_op_square_root").onclick = function(){
        if (!selectedOperation) {
            if (a = a)
                { a = Math.sqrt(+a).toString();}
                else { a = ''; }
            outputElement.innerHTML = a;
        }
    }

    //возведение в квадрат (6){
        document.getElementById("btn_op_square").onclick = function(){
            if (!selectedOperation) {
                if (a = a)
                    { a = Math.pow(+a, 2).toString();}
                    else { a = ''; }
                outputElement.innerHTML = a;
            }
        }

    //итеративный факториал (7)
    document.getElementById("btn_op_factorial").onclick = function() {
        if (!selectedOperation) {
            if (a = a){
                let result = 1;
                for (let i = 2; i <= +a; i++) {
                result *= i;
                }
                a = (result).toString();}
                else { a = ''; }
            outputElement.innerHTML = a;
        }
    }

    //добавление трех нулей (8)
    document.getElementById("btn_digit_triple_zero").onclick = function(){
        if (!selectedOperation) {
            a += '000';
            outputElement.innerHTML = a;
        } else {
            b += '000';
            outputElement.innerHTML = b;
        }
    }

    // смена окна вывода (11)
    document.getElementById("btn_op_output").onclick = function(){
        outputElement.classList.toggle('colored-output');
    }

    //рекурсивный факториал (12)
    function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }
    
    document.getElementById("btn_op_factorial2").onclick = function(){
        if (!selectedOperation) {
            a = a ? factorial(+a).toString() : '';
            outputElement.innerHTML = a;
        }
    }


    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    };