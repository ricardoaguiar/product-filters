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

const SelectedFilters = ({ selectedItems, setSelectedItems }) => (
  <>
    {selectedItems.map((selectedItem) => (
      <div key={selectedItem}>
        {selectedItem}
        <button
          onClick={() => {
            setSelectedItems(
              selectedItems.filter((item) => item !== selectedItem)
            );
          }}
        >
          X
        </button>
      </div>
    ))}
  </>
);

const App = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);

  const filteredProducts = products.filter((product) => {
    const matchesSelectedColors =
      selectedColors.some((color) => product.colors.includes(color)) ||
      selectedColors.length === 0;
    const matchesSelectedSizes =
      selectedSizes.some((size) => product.sizes.includes(size)) ||
      selectedSizes.length === 0;
    const matchesSelectedAvailabilities =
      selectedAvailabilities.some((availability) =>
        product.availability.includes(availability)
      ) || selectedAvailabilities.length === 0;
    return (
      matchesSelectedColors &&
      matchesSelectedSizes &&
      matchesSelectedAvailabilities
    );
  });

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
      <SelectedFilters
        selectedItems={selectedColors}
        setSelectedItems={setSelectedColors}
      />
      <SelectedFilters
        selectedItems={selectedSizes}
        setSelectedItems={setSelectedSizes}
      />
      <SelectedFilters
        selectedItems={selectedAvailabilities}
        setSelectedItems={setSelectedAvailabilities}
      />
      <main>
        <div>{filteredProducts.length} items</div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Colors: {product.colors.join(", ")}</p>
            <p>Sizes: {product.sizes.join(", ")}</p>
            <p>Stores: {product.availability.join(", ")}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
