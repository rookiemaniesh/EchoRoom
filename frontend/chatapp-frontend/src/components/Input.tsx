import { SendIcon } from '../assets/send'
type InputProps = {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onSend: (message: string) => void;
};
const Input = ({ placeholder, value, onChange, onSend }: InputProps) => {
  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      onChange(''); // Clear input after sending
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
 
  return (
    <div className='flex items-center gap-2  mt-4'>
      <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder={placeholder} 
      className='p-2 bg-zinc-900 border border-zinc-500 w-full text-zinc-200 rounded-lg font-doto' />
      <button onClick={handleSend} className='bg-zinc-500 p-2 rounded-lg hover:bg-zinc-400'><SendIcon/></button>
    </div>
  )
}

export default Input
