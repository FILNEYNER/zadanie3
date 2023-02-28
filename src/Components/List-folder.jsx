import React from 'react';

const ListFolder = (props) => {
    console.log(props.children)
    return (
        <div>
            {props.children?.map((item)=><p key={item.id}>{item.name}</p>)}
        </div>
    );
};

export default ListFolder;