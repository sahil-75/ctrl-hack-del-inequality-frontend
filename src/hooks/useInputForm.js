import { useState } from 'react';

const useInputForm = (
  defaultValue
) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event) =>
    setValue(event.target.value);

  return [value, handleChange];
};

export default useInputForm;