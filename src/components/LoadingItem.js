import React from 'react';

const  LoadingItem = () => {

    let arr = [];
    for (let i = 1; i <= 200; i++) {
        arr.push(<div key={i} className='emoji-loding'></div>);
    }
    return arr;


}

export default LoadingItem;