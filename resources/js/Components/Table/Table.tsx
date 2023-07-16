import {TableContainer} from "@/Components/Table/TableStyledComponent";

type TableProps = {
    headerItems:
        {
            field: string,
            label: string,
            formatter?: (value: any, row: any) => any,
        }[],
    data: any[],
}

export default function Table({ headerItems, data } : TableProps) {
    return (
        <TableContainer>
            <thead>
            <tr>
                { headerItems.map((item, index) => (
                    <th key={index}>{item.label}</th>
                )) }
            </tr>
            </thead>
            <tbody>
            { data.map((item, index) => (
                <tr key={index}>
                    {headerItems.map((headerItem, index) => (
                        <td key={index}>{headerItem.formatter ?
                            headerItem.formatter(item[headerItem.field], item) :
                            item[headerItem.field]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </TableContainer>
    )
}
