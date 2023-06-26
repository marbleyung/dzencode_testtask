import React from "react";
import MySelect from './UI/select/MySelect.jsx';


function CommentsFilter({ filter, setFilter }) {
    return (
        < div >
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sort by"
                options={[
                    { value: 'owner', name: 'By Author' },
                    { value: 'email', name: 'By Email' },
                    { value: '-created', name: 'Newest first' },
                    { value: 'created', name: 'Latest first' },
                ]}
            />
        </ div >
    )
}

export default CommentsFilter;
