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

export default SelectedFilters;
