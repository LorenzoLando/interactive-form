//when the page loads the first field is focused by default
const name = $('#name');
const eMail =  $('#mail');
const titleField = $('#title');
const testerEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$('#name').focus();
$("#other-title").parent().hide();
titleField.on('click', (element) => {
//quando otherjobs viene clicckato
if(element.target.value === 'other') {
//rimuovi hide da other jobs
   $("#other-title").parent().fadeIn( "slow" );
//jobRoleField.parentElement.classList.remove('hide');
//quando uno qualunque degli elementi escluso other viene clicckato
} else {
//aggiungi hide a other-jobs
$("#other-title").parent().fadeOut( "slow" );
}
});



const generalInfoVerification = () => { // verify the field are not empty and with a correct value
    let nameIsVerified = /\w[^\d]/.test($('#name').val());
    let emailIsVerified = testerEmail.test($('#mail').val());
    if(nameIsVerified && emailIsVerified) { // everthing is verified
        return true;
    } else { // return false and menage the error messages
        nameIsVerified ? $('#name').addClass('correct') : $('#name').addClass('error');
        emailIsVerified ? $('#mail').addClass('correct') : $('#mail').addClass('error');
        return false;
    }
}






/// T-SHIRT --- hide and show T-shirt options (design and color)

$("#colors-js-puns").hide();

$("#design").change(function () {
    $('#color').val('select-color');
    if ($("#design").val() === "js puns") {
    $("#colors-js-puns").show();
    $("#color").children().hide();
    $("#color").children("option").eq(1).show();
    $("#color").children("option").eq(2).show();
    $("#color").children("option").eq(3).show();
} else if ($("#design").val() === "heart js") {
    $("#colors-js-puns").show();
    $("#color").children().hide();
    $("#color").children("option").eq(4).show();
    $("#color").children("option").eq(5).show();
    $("#color").children("option").eq(6).show();
} else {$("#colors-js-puns").hide();
}
});

// red error message pops up when users don't select all mandatory fields
const tshirtVerification = () => {
    if ( ($("#design").val() === "select theme") || (!$("#color").val()) ) {
        if(!document.querySelector('#select-tshirt')) {
            $(".shirt").append( "<span id='select-tshirt'>Please select a valid option</span>");
        }
        return false;
    } else {
		return true;
	}
}

// remove error message from the DOM
$("#design").focus(function() {
   $("#select-tshirt").remove();
});

$("#color").focus(function() {
    $("#select-tshirt").remove();
 });

let totalValue = 0;
const $totalValueTag = $(`<h3 class='total-label'>Total: $ <span class='total-value'>${totalValue}</span></h3>`);

$('.activities').on('change', 'input', function(event) {
  if ($('.total-label').length === 0) {
    $('.activities').append($totalValueTag);
    $('.total-label').hide().fadeIn('slow');
    $('.total-value').hide().fadeIn('slow');
  } else if ($('.activities input:checked').length === 0) {
    $('.total-value').fadeOut('slow');
  } else {
    $('.total-value').hide().fadeIn('slow');
  }

  if ($(this).parent()[0].innerText.indexOf("Tuesday 9am") >= 0 && $(this).is(':checked')) {
    $('.activities label:contains("Tuesday 9am")').addClass('disabled').children().attr('disabled', true);
    $(this).removeAttr('disabled').parent().removeClass('disabled');
  } else if ($(this).parent()[0].innerText.indexOf("Tuesday 9am") >= 0 && $(this).is(':checked') === false) {
    $('.activities label:contains("Tuesday 9am")').removeClass('disabled').children().removeAttr('disabled');
  }

  if ($(this).parent()[0].innerText.indexOf("Tuesday 1pm") >= 0 && $(this).is(':checked')) {
    $('.activities label:contains("Tuesday 1pm")').addClass('disabled').children().attr('disabled', true);
    $(this).removeAttr('disabled').parent().removeClass('disabled');
  } else if ($(this).parent()[0].innerText.indexOf("Tuesday 1pm") >= 0 && $(this).is(':checked') === false) {
    $('.activities label:contains("Tuesday 1pm")').removeClass('disabled').children().removeAttr('disabled');
  }

  totalValue = 0;
  $('.activities input:checked').each(function(i){
    let totalNumber = $('.activities input:checked').parent()[i].innerText;
    totalNumber = totalNumber.match(/\$\d+/)[0];
    totalNumber = totalNumber.replace('$', '');
    totalValue += parseInt(totalNumber);
  })
    $('.total-value').text(totalValue);
}
);

const activitiesVerification = () => {
  let activitiesIsVerified = $('.total-value').text() > 0;
  if(activitiesIsVerified) {
      $('#no-activities').remove();
    return true;
  } else {
        if(!document.querySelector('#no-activities')) {
        activitiesIsVerified ? $('.total-label').addClass('correct') : $('.total-label').addClass('alert'), $('.activities').append('<span class="alert" id="no-activities">Select at least one activity</span>');
        }
    return false;
  }
}

// To show the correct section releted to the selected payment.
$('#payment').val('credit card').change(function() {
    switch ($('#payment').val()) {
        case 'credit card':
            $('#payment').nextAll().hide();
            $('#credit-card').show();
            break;
        case 'paypal':
            $('#payment').nextAll().hide();
            $('#paypal').show();
            break;
        case 'bitcoin':
            $('#payment').nextAll().hide();
            $('#bitcoin').show();
            break;
    }
});

const paymentVerification = () => { // verify the field are not empty and with a correct value
    let cvvIsVerified = /^\d{3}$/.test($('#cvv').val());
    let zipIsVerified = /^\d{5}$/.test($('#zip').val());
    let ccIsVerified = /^\d{13,16}$/.test($('#cc-num').val());
    if(cvvIsVerified && zipIsVerified && ccIsVerified) { // everthing is verified
        return true;
    } else { // return false and menage the error messages
        cvvIsVerified ? $('#cvv').addClass('correct') : $('#cvv').addClass('error');
        zipIsVerified ? $('#zip').addClass('correct') : $('#zip').addClass('error');
        ccIsVerified ? $('#cc-num').addClass('correct') : $('#cc-num').addClass('error');
        return false;
    }
}


// it showes the user if the {{input}} matches the {{regex}}.
const tester = ($input, regex, id) => {
    $input.keyup(function(event){
        if($input.val() === "") {
            $(id).css('display','none');
            $input.addClass('empty');
            $input.removeClass('error');
            $input.removeClass('correct');
        } else {
            if(regex.test($input.val())) {
              $(id).css('display','none');
              $input.removeClass('error');
              $input.addClass('correct');
              $input.removeClass('empty');
            } else {
                $(id).css('display','block');
                $input.removeClass('correct');
                $input.addClass('error');
                  // $input.prev().append('<span class="fixed">  test</span>');
            }
        }
    });
}

tester($('#cvv'),/^\d{3}$/, "#cvv-error");
tester($('#zip'),/^\d{5}$/, "#zip-error");
tester($('#cc-num'),/^\d{13,16}$/, "#cc-error");
tester(eMail,testerEmail, "#email-error");
tester(name, /\w[^\d]/, "#name-error")


$('button').click(function( event ) {
    event.preventDefault(); // it prevents the refresh of the page.
    let paymentOK = paymentVerification();
    const tshirtOK = tshirtVerification();
    const activitiesOK = activitiesVerification();
    const generalInfoOK = generalInfoVerification();
    if ($('#payment').val() === "bitcoin" || $('#payment').val() === "paypal") {
      paymentOK = true;
    }
    if(paymentOK && tshirtOK && activitiesOK && generalInfoOK) { // add your variable here with a && operator
        // form submitted!
        if(!document.querySelector('#success')) {
          if($('#failure')) {
            $('#failure').remove();
          }
          $('form').append(`<span id="success" style="color:green; padding:10px;">
          The form has been submitted! <span>`);
        }
       // TODO: make sure to add only one message!
    } else {
      if(!document.querySelector('#failure')) {
        if($('#success')) {
            $('#success').remove();
          }
        // prevent the submition of the form
        $('form').append(`<span id="failure" class="alert">
        Please fill the form correctly! <span>`); // TODO: make sure to add only one message!

      }

    }
  });
