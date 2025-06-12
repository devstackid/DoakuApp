export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block text-base font-[Helvetica-regular] tracking-wide text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}
