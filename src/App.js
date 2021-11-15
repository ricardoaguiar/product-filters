import { useState } from "react";
import products, { allColors, allSizes, allAvailabilities } from "./data";

const FilterDropdown = ({
  label,
  allItems,
  selectedItems,
  setSelectedItems,
  filteredProducts,
  propertyName,
}) => {
  const itemsInDropdown = allItems.filter((item) => {
    // E.g. if propertyName is "colors":
    // If there is at least one selected color,
    if (selectedItems.length > 0) {
      // we want to have all colors in the dropdown,
      // except for the ones which are selected
      return !selectedItems.includes(item);
    }
    // If there is no color selected
    else {
      // we want to have only the colors in the dropdown,
      // where at least one of the filtered products
      // is available in one of the selected colors
      return filteredProducts.some((product) =>
        product[propertyName].some((property) => item === property)
      );
    }
  });

  return (
    <span className="filterDropdown">
      <label>{label}</label>
      <select
        onChange={(event) => {
          setSelectedItems([...selectedItems, event.target.value]);
        }}
      >
        <option value="0">Please select</option>
        {itemsInDropdown.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </span>
  );
};

const SelectedFilters = ({ selectedItems, setSelectedItems }) => (
  <>
    {selectedItems.map((selectedItem) => (
      <span key={selectedItem} className="selectedFilter">
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
      </span>
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
        label="Color"
        allItems={allColors}
        selectedItems={selectedColors}
        setSelectedItems={setSelectedColors}
        filteredProducts={filteredProducts}
        propertyName="colors"
      />
      <FilterDropdown
        label="Size"
        allItems={allSizes}
        selectedItems={selectedSizes}
        setSelectedItems={setSelectedSizes}
        filteredProducts={filteredProducts}
        propertyName="sizes"
      />
      <FilterDropdown
        label="Store"
        allItems={allAvailabilities}
        selectedItems={selectedAvailabilities}
        setSelectedItems={setSelectedAvailabilities}
        filteredProducts={filteredProducts}
        propertyName="availability"
      />
      <div>
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
      </div>
      <main>
        <div>{filteredProducts.length} items</div>
        <div className="productGrid">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>Colors: {product.colors.join(", ")}</p>
              <p>Sizes: {product.sizes.join(", ")}</p>
              <p>Stores: {product.availability.join(", ")}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
