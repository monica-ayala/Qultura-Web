var stepper = document.querySelector('.stepper');
var stepperInstace = new MStepper(stepper, {
    firstActive: 0 ,
    
})

function addSalas(){
    var elements = '<li class="step active"> <div class="step-title waves-effect"> SECOND </div> <div class="step-content"><input><div>2</div><div class="step-actions"><button class="waves-effect waves-dark btn next-step">CONTINUE</button></div></div></li>'
    var addedSteps = stepperInstace.activateStep(elements, 2);
}

// var elements;
// // The element can be a string:
// elements = '<div class="step">(...your step goes here...)</div>';
// // An array of strings:
// elements = ['<div class="step">(...your step goes here...)</div>', '<div class="step">(...your step goes here...)</div>'];
// // An HTMLCollection:
// elements = document.querySelectorAll('.steps-to-add');
// // Or an HTMLElement:
// elements = document.querySelector('.step-to-add');

// // Then you just need to run
// var addedSteps = instance.activateStep(elements, newStepsIndex);
// // And if you want, you can remove them afterwards:
// var removedSteps = instance.deactivateStep(addedSteps);
// // Or add them again :P
// var readdedSteps = instance.activateStep(removedSteps);
