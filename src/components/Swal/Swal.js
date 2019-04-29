import React from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const Swal = props => {
  const { showSwal, swalTitle, swalText, type, closeHandler, confirm } = props;

  return (
    <SweetAlert
      show={showSwal}
      title={swalTitle}
      text={swalText}
      showCancelButton
      type={type || "warning"}
      onEscapeKey={closeHandler}
      onCancel={closeHandler}
      onConfirm={confirm}
    />
  )
}

export default Swal;
