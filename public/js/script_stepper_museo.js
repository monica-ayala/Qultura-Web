var stepper = document.querySelector('.stepper');
var stepperInstace = new MStepper(stepper, {
    firstActive: 0 ,
    
})

function addSalas(){
    var elements = '<li class="step"><div class="step-title waves-effect"> Sala </div><div class="step-content"><div class="input-field col s10 offset-s1"><textarea id="desc_museo" name="desc_museo" class="materialize-textarea validate"></textarea><label for="desc_museo"> Descripción </label></div><div> QUILL TEXT EDITOR? </div><div class="step-actions"><div class="row"><div class="col"> <button class="red btn btn-reset" type="reset"> Resetear <i class="material-icons left"> clear </i>  </button> </div><div class="col"> <button class="btn light-blue-secondary previous-step"> Anterior  <i class="material-icons left"> arrow_back </i> </button> </div><div class="col"> <button class="waves-effect waves dark btn light-blue-secondary next-step" type="reset"> Siguiente <i class="material-icons right"> arrow_forward </i> </button> </div></div></div></div></li>'
    var addedSteps = stepperInstace.activateStep(elements, 3);
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
