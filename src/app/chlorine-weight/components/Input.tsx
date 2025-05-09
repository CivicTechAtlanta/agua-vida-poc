
type InputProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ label, name, value, placeholder, handleChange }: InputProps) {
  return (
    <div className="input-group">
      <p>{label}</p>
      <input name={name} value={value} placeholder={placeholder} type="number" onChange={handleChange}></input>
    </div>
  );
}
