import React, {useState} from "react";
import Pagination from 'react-bootstrap/Pagination';

import "./PaginationTable.scss"

export default function PaginationTable(props) {
    const {paginate, setNumPage, numPage} = props;
    const [toggleNumPages, setToggleNumPages] = useState(false)

    if(paginate.total_pages <= 1) return

    let active = numPage;
    let items = [];

    for (let number = 1; number <= paginate.total_pages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={()=>{setNumPage(number)}}>
                {number}
            </Pagination.Item>
        );
    }

    return(
        <div className="pagination-table">
            <Pagination>
                <Pagination.First onClick={()=>{setNumPage(1)}} />

                {
                    !toggleNumPages && <Pagination.Prev onClick={() => {setNumPage(numPage - 1)}}/>
                }

                <Pagination.Ellipsis
                    className="d-none d-sm-table-cell"
                    onClick={() =>{ setToggleNumPages(!toggleNumPages) }} />

                { toggleNumPages && items }

                {
                    !toggleNumPages && <Pagination.Next onClick={() => {setNumPage(numPage + 1)}}/>
                }

                <Pagination.Last onClick={()=>{setNumPage(paginate.total_pages)}} />
            </Pagination>
        </div>
    )
}
