
type InputProps = {
  label: string;
  name: string;
  value: string | number;
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

export default function Input({ label, name, value, defaultValue, placeholder, handleChange }: InputProps) {
  if (defaultValue === undefined) {
    defaultValue = '';
  }
  return (
    <div className="input-group">
      <p>{label}</p>
      <input name={name} value={value} placeholder={placeholder} type="number" onChange={handleChange}></input>
    </div>
  );
}
