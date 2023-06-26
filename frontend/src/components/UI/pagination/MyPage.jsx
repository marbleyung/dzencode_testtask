import React from "react";
import { getPagesArray } from "../../../utils/paginator.js";

function Page({totalPages, page, changePage}) {

    // optimize with useMemo
    let pagesArray = getPagesArray(totalPages)
    
    return (
        <div className="page-wrapper">
            {pagesArray.map(p => {
                return <span key={p}
                    onClick={() => changePage(p)}
                    className={page === p ? 'page-button page-current' : 'page-button'}>{p}</span>
            })}
        </div>
    )
}

export default Page;
