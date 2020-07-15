import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import '../css/Modal.css';

const Modal = forwardRef((props, ref) => {

    const [display, setDisplay] = useState(false);
    useImperativeHandle(ref, () => {
        return {
            open: () => open(),
            close: () => close()
        }
    });

    const open = () => {
        setDisplay(true);
    };

    const close = () => {
        setDisplay(false);
    };


    return (
        display && ReactDOM.createPortal(
            <div className="modal-wrapper">
                <div className="modal-backdrop">
                    <div className="modal-box">
                        <button className="closebtn" onClick={close}>&times;</button>
                        {props.children}
                    </div>
                </div>
            </div>, document.getElementById("modal-root")
        )


    );
});

export default Modal;