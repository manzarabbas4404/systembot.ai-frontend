


const WidgetIcon = ({children, text, onClick, isActive}) =>{
    return (
        <>
            <div onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer ${isActive ? 'bg-[#30b6ff] text-white' : 'hover:bg-slate-100'}`}>
                <span>{children}</span>
                {
                    isActive && 
                    <p>{text}</p>
                }
            </div>
        </>
    )
}

export default WidgetIcon