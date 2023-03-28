import React from 'react';
import SubAdminSetting from "../../features/sub-admins/components/SubAdminSetting";
import {useSelector} from "react-redux";
import {selectCurrentUserId} from "../../features/auth/authSlice";
import {useGetSubAdminByIdQuery} from "../../features/sub-admins/subAdminsApiSlice";

const SubAdminSettingsPage = () => {
    const subAdminId = useSelector(selectCurrentUserId);
    const {data, isLoading, isSuccess, isError, error} = useGetSubAdminByIdQuery(subAdminId);
    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const subAdmin = data.entities[subAdminId];
        content = (<SubAdminSetting subAdmin={subAdmin}/>)
    }
    return (
        content
    );
};

export default SubAdminSettingsPage;

