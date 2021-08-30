$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('#password').focusout(function(){
  $('#password').siblings().css("display" , "none");
});

$('#confirm-password').focusout(function(){
  $('#confirm-password').siblings().css("display" , "none");
});

$('#password').focusin(function(){
  $('#password').siblings().css("display" , "block");
});

$('#confirm-password').focusin(function(){
  $('#confirm-password').siblings().css("display" , "block");
});

let valid_password = false;
function validatePassword(element)
{
  let el = $(element);
  let input = el.attr('id');
  let password = el.val();
  $(element).siblings().css("display", "block");
  $(element).siblings().css("background", "#E55D5D");
  if(password.length < 8)
  {
      $(element).siblings().html('Password length should be atleast 8 charecters');
      return;
  }

    // check strength of password.

    let special_char = 0;
    let uppercase = 0;
    let lowercase = 0;
    let digit = 0;
    for(let i = 0; i<password.length; i++)
    {
      let char = password[i];
      if(char == '@' || char == '#' || char == '$' || char == '%' || char == '^' || char == '&')
        special_char++;
      if(char <= 'Z' && char >= 'A')
        uppercase++;
      if(char <= 'z' && char >= 'a')
        lowercase++;
      if(char <= '9' && char >= '0')
        digit++;
    }

    if(!special_char)
      $(element).siblings().html('Password must contain atleast one special charecter. [@ # $ % ^ & *]');
    else if(!uppercase)
      $(element).siblings().html('Password must contain atleast one uppercase letter.');
    else if(!lowercase)
      $(element).siblings().html('Password must contain atleast one lowercase letter.');
    else if(!digit)
      $(element).siblings().html('Password must contain atleast one digit.');
    else
    {
        valid_password = true;
        $(element).siblings().html('Password is valid.');
        $(element).siblings().css("background", "#62BE67");
    }
}

$(".register-form").submit(function(e){
        e.preventDefault();
        // check password match here.

        let email = $('.register-form #email').val();
        let full_name = $('.register-form #fname').val();
        let password = $('.register-form #password').val();
        let confirm_password = $('.register-form #confirm-password').val();

        // compare password equality here, throw an error if mismatch else send data via ajax request
        let password_match = false;
        if(password === confirm_password) {
          password_match = true;
        }

        if(valid_password && password_match) {
          $.ajax({
          url: '/user/register',
          data: {
              fname : full_name,
              email : email,
              password : password,
              confirm_password : confirm_password
          },
          type: 'POST',
          success: function (results) {
            console.log(results);
            if (results.redirect) {
              // results.redirect contains the string URL to redirect to
              window.location.href = results.redirect;
            }
          }
          });
        } else if(!password_match) {
          $('.register-form #confirm-password').siblings().css("display", "block");
          $('.register-form #confirm-password').siblings().css("background", "#E55D5D");
          $('.register-form #confirm-password').siblings().html('Password does not match.');
        } else if(!valid_password) {
          $('.register-form #confirm-password').siblings().css("display", "block");
          $('.register-form #confirm-password').siblings().css("background", "#E55D5D");
          $('.register-form #confirm-password').siblings().html('Password is not valid.');
        }
});
