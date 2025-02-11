export const Balance = ({value}) => {
    return <div className="flex ml-4 mt-8">
        <div className="font-bold text-lg">
            Your Balance  
        </div>
        <div className="font-semibold text-lg pl-2">
            Rs {value}/-
        </div>
    </div>
} 