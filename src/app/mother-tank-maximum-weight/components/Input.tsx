type InputProps = {
  label: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  defaultValue?: string;
};

export default function Input({ label, name, min, defaultValue, handleChange }: InputProps) {
  if (defaultValue === undefined) {
    defaultValue = '';
  }
  return (
    <div className="input-group">
      <p>{label}</p>
      <input name={name} min={min} type="number" onChange={handleChange} step="0.01" defaultValue={defaultValue} />
    </div>
  );
}
