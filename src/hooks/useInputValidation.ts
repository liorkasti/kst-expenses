// import {useState, useEffect} from 'react';

// const useNameValidation = name => {
//   const [isValidName, setIsValidName] = useState(false);

//   useEffect(() => {
//     const validateName = () => {
//       const regex = /^[A-Za-z]{3,20}$/;
//       const isValid = regex.test(name);
//       setIsValidName(isValid);
//     };

//     validateName();
//   }, [name]);

//   return isValidName;
// };

import {useState} from 'react';

const useInputValidation = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [nameError, setNameError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [amountError, setAmountError] = useState('');

  const validateInputs = () => {
    let isValid = true;

    if (name) {
      const regex = /^[A-Za-z]{3,20}$/;
      if (!regex.test(name.trim())) {
        setNameError('Name is required');
        isValid = false;
      } else {
        setNameError('');
      }
      return isValid;
    } else {
      // Title validation
      if (title.trim() === '') {
        setTitleError('Title is required\nPlease enter an expense title');
        isValid = false;
      } else {
        setTitleError('');
      }

      // Amount validation
      const amountRegex = /^\d+(\.\d{1,2})?$/; // Regex for valid numeric input with up to 2 decimal places
      if (amount.trim() === '') {
        setAmountError('Amount is required\nPlease enter a number');
        isValid = false;
      } else if (!amountRegex.test(amount)) {
        setAmountError('Invalid amount');
        isValid = false;
      } else {
        setAmountError('');
      }

      return isValid;
    }
  };

  return {
    name,
    setName,
    title,
    setTitle,
    amount,
    setAmount,
    nameError,
    titleError,
    amountError,
    validateInputs,
  };
};

export default useInputValidation;
