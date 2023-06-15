import {useState, useEffect} from 'react';

const useNameValidation = name => {
  const [isValidName, setIsValidName] = useState(false);

  useEffect(() => {
    const validateName = () => {
      const regex = /^[A-Za-z]{3,20}$/;
      const isValid = regex.test(name);
      setIsValidName(isValid);
    };

    validateName();
  }, [name]);

  return isValidName;
};

export default useNameValidation;
