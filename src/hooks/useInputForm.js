import {  useState } from 'react';

const useInputForm = (
  deafultValue
) => {
  const [value, setValue] = useState(deafultValue);

  const handleChange = (event) =>
    setValue(event.target.value);

  return [value, handleChange];
};

export default useInputForm;
