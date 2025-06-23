type InputProps = {
  label: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
};

export default function Input({ label, name, min, handleChange }: InputProps) {
  return (
    <div className="input-group">
      <p>{label}</p>
      <input name={name} min={min} type="number" onChange={handleChange} step="0.01"></input>
    </div>
  );
}
