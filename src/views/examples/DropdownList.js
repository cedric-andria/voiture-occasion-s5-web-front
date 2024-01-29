import React, { useState } from 'react';

const DropdownList = () => {
  // State to manage the selected value of the dropdown
  const [selectedValue, setSelectedValue] = useState('');

  // Handler function to update the selected value when the user makes a selection
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown"></label>
      <select id="dropdown"  onChange={handleSelectChange}>
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <p>Selected Value: {selectedValue}</p>
    </div>
  );
};

export default DropdownList;
