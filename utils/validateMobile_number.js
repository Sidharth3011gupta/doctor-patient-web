function validateMobilenumber(mobile_number){
    const isvalidlength =mobile_number.length===10;
    const type= typeof mobile_number === 'number';
    return {
        isValid: type &&  isvalidlength,
        errors: {
          type,
          isvalidlength
        }
      };

} 
module.exports=validateMobilenumber;