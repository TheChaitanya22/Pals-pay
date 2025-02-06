export function Inputbox({ label, placeholder }) {
    return <div>
        <div className="text-base font-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeholder} 
        className="w-full px-2 py-1 border-slate-200 border rounded" />
    </div>
}