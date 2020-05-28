
import DeleteModal from "./modal_delete";
import React from 'react';

const deleteProfile = (props) => {
  return (
    <div>
           <DeleteModal userId={props.userId}/>

    </div>
  );
};

export default deleteProfile;