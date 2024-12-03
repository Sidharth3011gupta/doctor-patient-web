function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);       
    const hasLowerCase = /[a-z]/.test(password);       
    const hasDigit = /\d/.test(password);              
    const hasSpecialChar = /[@$!%*?&#]/.test(password);
    const isValidLength = password.length >= 8;        
    return {
      isValid: hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isValidLength,
      errors: {
        hasUpperCase,
        hasLowerCase,
        hasDigit,
        hasSpecialChar,
        isValidLength,
      }
    };
  }
  function validateConfirmPassword(password, confirmPassword) {
    const passwordsMatch = password === confirmPassword;
    return {
        isValid: passwordsMatch,
        errors: {
            passwordsMatch
        }
    };
  }
  module.exports=validatePassword,validateConfirmPassword;
  