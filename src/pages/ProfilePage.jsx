import React, { useState, useRef, useContext } from 'react';
import UserContext from '../context/user/userContext';
import { useIsMount } from '../hooks/useIsMount';
import Modal from '../components/Modal';
import '../css/ProfilePage.css';
import { useEffect } from 'react';
import { UsernameAttributes } from 'aws-amplify-react';

const ProfilePage = () => {
    const { signOut, userAttr, user, updateEmail, error, resetError, checkVerificationCode } = useContext(UserContext);

    const [updatedEmail, setUpdatedEmail] = useState(userAttr?.email);
    const [modalContent, setModalContent] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const modalRef = useRef();
    const isMount = useIsMount();
    /*** EDIT EMAIL */

    /*controlled component for email input box*/
    const handleEmailChange = (e) => {
        setUpdatedEmail(e.target.value);
    }
    const handleEditEmail = (e) => {
        setModalContent(
            <>
                <h3>Enter new Email</h3>
                <form onSubmit={submitNewEmail}>
                    <label htmlFor="newEmail">Enter New Email</label>
                    <input type="text" name="newEmail" defaultValue="" />
                    <button >Submit</button>
                </form>
            </>
        )
        modalRef.current.open();
    }
    /** when saved button is clicked for email */
    const submitNewEmail = (e) => {
        e.preventDefault();
        setUpdatedEmail(e.target.newEmail.value);
        updateEmail(e.target.newEmail.value);

        setModalContent("");
        if (!error) {
            setModalContent(
                <>
                    <h3>Verification code has been sent to {updatedEmail} </h3>
                    <form onSubmit={submitVerificationCode}>
                        <label htmlFor="verificationCode">Enter Verification Code</label>
                        <input type="text" name="verificationCode" placeholder="" ></input>
                        <button onSubmit={() => { modalRef.current.close(); setModalContent("") }}>Submit</button>
                    </form>
                </>
            )
            modalRef.current.open();
        }
    }
    /* when verificationCode is submitted */
    const submitVerificationCode = async (event) => {
        event.preventDefault();
        setVerificationCode(event.target.verificationCode.value.trim());
        // verificationCode change triggers editEmail() in useEffect();
    }
    // Modal dialog appears when verification code is submitted.
    useEffect(() => {
        if (verificationCode) {
            const result = checkVerificationCode(verificationCode);
            console.log(result);
            if (!error) {
                setModalContent(
                    <>
                        <h2>Success</h2>
                        <p>Email has been successfully verified to {updatedEmail}</p>
                        <button onClick={() => modalRef.current.close()}>OK</button>
                    </>
                );
                modalRef.current.open();
            };
        }
        // eslint-disable-next-line
    }, [verificationCode]);

    /** Modal appears if any error **/
    useEffect(() => {
        if (!isMount && !error) {
            setModalContent(
                <>
                    <h2>Error</h2>
                    <p>error</p>
                    <button onClick={() => modalRef.current.close()}>OK</button>
                </>
            );
            modalRef.current.open();
            resetError();
        }
        // eslint-disable-next-line
    }, [error]);


    /*** DELETE ACCOUNT ***/
    const handleDeleteProfile = () => {
        setModalContent(
            <>
                <h2>Attention!</h2>
                <p>This will permanently delete your account. Continue?</p>
                <button onClick={() => modalRef.current.close()}>Cancel</button>
                <button onClick={deleteProfile}>Delete</button>
            </>
        );
        modalRef.current.open();

    }

    const deleteProfile = () => {
        user.deleteUser(function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
            signOut();
        });
    }

    return (
        userAttr && (
            <>
                <div className="profile-container">
                    <div className="profile-box">
                        <div className="profile-header">
                            Profile{console.log(userAttr.email)}
                        </div>
                        <div className="profile-content">
                            <div className="profile-info">
                                <div className="profile-info-title">Username</div>
                                <div className="profile-info-detail">{user.username}</div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-info-title">{`Email (${userAttr.email_verified ? "Verified" : "Unverified"})`} </div>
                                <div className="profile-info-detail">{userAttr.email}</div>
                                <div className="profile-info-button"><button onClick={handleEditEmail}>Edit</button>
                                </div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-info-title">Phone Number</div>
                                <div className="profile-info-detail">{userAttr.phone_number}</div>
                                <div className="profile-info-button"><button>Edit</button></div>
                            </div>
                            <div className="profile-info-delete">
                                <div className="profile-info-title">Delete Profile</div>
                                <div className="profile-info-detail">Sorry to see you go</div>
                                <div className="profile-info-button"><button className="btn-delete" onClick={handleDeleteProfile}>Delete</button></div>

                            </div>
                        </div>
                    </div >
                </div>
                <Modal ref={modalRef}>
                    {modalContent}
                </Modal>
            </>)

    );
};

export default ProfilePage;