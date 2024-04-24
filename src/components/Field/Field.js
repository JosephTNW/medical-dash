const Field = ({ options, zod, id, defaultValue, label, type, max }) => {
  return (
    <div className="form-child">
      <label className="form_label" htmlFor={id}>
        {label}
      </label>
      {options !== undefined ? (
        <select
          id={id}
          className="select-form"
          defaultValue={defaultValue}
          {...zod}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          max={max}
          className="select-form"
          type={type}
          id="Height"
          defaultValue={defaultValue}
          {...zod}
        />
      )}
    </div>
  );
};

export default Field;
