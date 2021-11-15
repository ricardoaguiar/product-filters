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

export default FilterDropdown;
