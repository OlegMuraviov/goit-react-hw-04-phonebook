const Filter = ({ value, setFilter }) => {
  return (
    <div>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        onChange={e => setFilter(e.target.value)}
        type="text"
        name="filter"
        value={value}
      />
    </div>
  );
};
export default Filter;
