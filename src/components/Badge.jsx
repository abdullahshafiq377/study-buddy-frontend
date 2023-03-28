import React from 'react';

const Badge = ({text, isQuestion, userType}) => {
    let classNames = "inline-flex items-center rounded bg-primary-200 px-2 py-0.5 text-xs font-medium text-gray-800 mr-2";
    if (isQuestion) {
        classNames = "inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 mr-2";
        text = "Question";
    }
    else if (userType){
       classNames = "inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 mr-2";
       text = userType;
    }
    return (
        <span className={classNames}>
        {text}
      </span>
    );
};

export default Badge;
