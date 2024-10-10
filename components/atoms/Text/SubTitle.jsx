import React from "react";
import { DOM } from "../../nanites";

const SubTitle = ({ subTitle, children, ...props }) => {
    return (
        <DOM.StyledSubTitle
            className="soustitre"

            style={{ backgroundColor: "red" }}
            {...props}
        >
            {children}
        </DOM.StyledSubTitle>
    );
};

export default SubTitle;