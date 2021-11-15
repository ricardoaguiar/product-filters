import { useState } from "react";
import products, { allColors, allSizes, allAvailabilities } from "./data";

const FilterDropdown = ({
  label,
  allItems,
  selectedItems,
  setSelectedItems,
}) => (
  <>
    <label>{label}</label>
    <select
      onChange={(event) => {
        setSelectedItems([...selectedItems, event.target.value]);
      }}
    >
      <option value="0">Please select</option>
      {allItems
        .filter((item) => !selectedItems.includes(item))
        .map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
    </select>
  </>
);

const App = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);

  return (
    <div className="App">
      <FilterDropdown
        title="Color"
        allItems={allColors}
        selectedItems={selectedColors}
        setSelectedItems={setSelectedColors}
      />
      <FilterDropdown
        title="Size"
        allItems={allSizes}
        selectedItems={selectedSizes}
        setSelectedItems={setSelectedSizes}
      />
      <FilterDropdown
        title="Store"
        allItems={allAvailabilities}
        selectedItems={selectedAvailabilities}
        setSelectedItems={setSelectedAvailabilities}
      />
      {selectedColors.join("")}
      {selectedSizes.join("")}
      {selectedAvailabilities.join("")}
      <main>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
