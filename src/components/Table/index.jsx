


const Table = ({rows}) => {
    return (
        <>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-[#2e2d2d] dark:text-[#2e2d2d]">
                    <thead class="text-xs text-[#2e2d2d] uppercase bg-gray-50 dark:text-[#2e2d2d]">
                        <tr className="dark:border-gray-200 border">
                            <th scope="col" class="px-6 py-3">
                                Fields
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Types
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Param Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Example
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows?.map(row =>{
                                return (
                                    <tr class=" dark:border-gray-200 border">
                                        <th scope="row" class="px-6 py-4 font-medium text-[#2e2d2d] whitespace-nowrap dark:text-[#000000]">
                                            {row.field_name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {row.var_type}
                                        </td>
                                        <td class="px-6 py-4">
                                            {row.param_type}
                                        </td>
                                        <td class="px-6 py-4">
                                            {row.example}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table