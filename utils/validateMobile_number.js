function validateMobilenumber(mobile_number){
    const isvalidlength =mobile_number.toString().length===10;
    const mobiletype= typeof mobile_number === 'number';
    return {
        isValid: mobiletype &&  isvalidlength,
        errors: {
          mobiletype,
          isvalidlength
        }
      };

} 
module.exports=validateMobilenumber;