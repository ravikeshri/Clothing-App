// Unit test for the endpoint that verifies user input at the time of login in. routes/user.js line : 15-51
function testLoginInputs(fname, email, password, confirm_password)
{
  if (!fname || !email || !password || !confirm_password) {
      return 'Please enter all fields';
  }

  if (password != confirm_password) {
      return 'Passwords do not match';
  }

  if (password.length < 8) {
      return 'Password must be at least 8 characters';
  }

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
    return 'Password must contain atleast one special charecter. [@ # $ % ^ & *]';
  else if(!uppercase)
    return 'Password must contain atleast one uppercase letter.';
  else if(!lowercase)
    return 'Password must contain atleast one lowercase letter.';
  else if(!digit)
    return 'Password must contain atleast one digit.';
}

// suite of test cases dealing with user authentication.
describe("User authentication", () =>{
  // Test case 1 : empty full name
  it("Empty fullname", () => {
    expect(testLoginInputs('', 'ashish.xenon@gmail.com', 'Qwerty1@', 'Qwerty1@')).toEqual('Please enter all fields');
  });

  // Test Case 2 : Empty email id
  it("Empty email", () => {
    expect(testLoginInputs('Ashish Kujur', '', 'Qwerty1@', 'Qwerty1@')).toEqual('Please enter all fields');
  });

  // Test Case 3 : Empty password
  it("Empty password", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', '', 'Qwerty1@')).toEqual('Please enter all fields');
  });

  // Test Case 4 : Empty password confirmation
  it("Empty password confirmation", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'Qwerty1@', '')).toEqual('Please enter all fields');
  });

  // Test Case 5 : Password confirmation match
  it("Password confirmation 1", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'Qwerty1', 'Qwerty1@')).toEqual('Password must be at least 8 characters');
  });

  // Test Case 6 : Password confirmation match
  it("Password confirmation 2", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'Qwerty1@@', 'Qwerty1@')).toEqual('Passwords do not match');
  });

  // Test Case 7 : Password validity check 1 (missing special charecter)
  it("Password validity 1 (missing special charecter)", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'Qwerty11', 'Qwerty11')).toEqual('Password must contain atleast one special charecter. [@ # $ % ^ & *]');
  });

  // Test Case 8 : Password validity check 2 (incorrect special charecter)
  it("Password validity 2 (incorrect special charecter)", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'Qwerty1!', 'Qwerty1!')).toEqual('Password must contain atleast one special charecter. [@ # $ % ^ & *]');
  });

  // Test Case 9 : Password validity check 3 (missing digit)
  it("Password validity 2 (missing digit)", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'Qwertyq@', 'Qwertyq@')).toEqual('Password must contain atleast one digit.');
  });

  // Test Case 10 : Password validity check 4 (missing lowercase charecter)
  it("Password validity 2 (missing lowercase charecter)", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'QWEWEEERER3@', 'QWEWEEERER3@')).toEqual('Password must contain atleast one lowercase letter.');
  });

  // Test Case 11 : Password validity check 5 (missing upercase charecter)
  it("Password validity 2 (missing uppercase charecter)", () => {
    expect(testLoginInputs('Ashish Kujur', 'ashish.xenon@gmail.com', 'qwertyuytre3@', 'qwertyuytre3@')).toEqual('Password must contain atleast one uppercase letter.');
  });
});
