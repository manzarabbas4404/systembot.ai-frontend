




const LocationCard = (props) => {
    return (
        <>
            <div className="flex items-center rounded-[7px] cursor-pointer hover:bg-[#0037FE] transition-all border border-[#0037FE] gap-[7px] px-[12px] py-[4px] group ">
                <i
                    onClick={() => {
                        props.onClose && props.onClose()
                    }} 
                 class="fa-solid fa-xmark text-[#0037FE] group-hover:text-[#ffffff] transition-all text-[12px] cursor-pointer "></i>
                <p className="group-hover:text-[#ffffff] text-[#0037FE] text-[13px] ">{props.heading}</p>
            </div>
        </>
    )
}

export default LocationCard