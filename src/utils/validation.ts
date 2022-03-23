/**
 * Validation Handler - Validates Forms, Inputs ect.
 * @author 'Guy'
 */

import User from 'src/app/Model/User';

const validateRgisterForm = (user: User) => {
  if (!user.firstName || !user.lastName || !user.address || !user.birthDate)
    return { answer: false, message: 'Fill all fields' };

  if (user.firstName.length < 3)
    return { answer: false, message: 'First Name is too short' };
  if (user.lastName.length < 3)
    return { answer: false, message: 'Last Name is too short' };
  if (user.address.length < 3)
    return { answer: false, message: 'Address is not valid' };
  if (!user.birthDate) return { answer: false, message: 'BirthData is a must' };
  return { answer: true, message: 'valid' };
};
export { validateRgisterForm };
//  const validateAddExpenseForm = (newExpense: Expense) => {
//    //TODO: Add Validations
//    if (!newExpense.storeName)
//      return { answer: false, message: 'Enter A Valid Store Name' };
//    if (!newExpense.amount)
//      return { answer: false, message: 'Enter A Valid Amount' };
//    return { answer: true, message: 'Valid' };
//  };

//  const validateAndFillEmptyUserSettings = (
//    updatedUser: User,
//    currentUser: User
//  ) => {
//    if (!updatedUser.name || updatedUser.name == '')
//      updatedUser.name = currentUser.name;
//    if (!updatedUser.balance) updatedUser.balance = currentUser.balance;
//    if (!updatedUser.dayOfTracking || updatedUser.dayOfTracking == 0)
//      updatedUser.dayOfTracking = currentUser.dayOfTracking;
//    return updatedUser;
//  };

//export { validateAddExpenseForm, validateAndFillEmptyUserSettings };
