import React, { useState, useRef } from 'react';
import Modal from '../components/Modal';
import '../css/ProfilePage.css';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useCallback } from 'react';

const ProfilePage = ({ user, userAttr }) => {
    const modalRef = useRef();

    const [email, setEmail] = useState(userAttr?.email);
    const [modalContent, setModalContent] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    const handleEditEmail = (e) => {
        e.preventDefault();
        editEmail();
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const editEmail = async () => {
        try {
            const updatedAttr = {
                email,
            }
            const result = await Auth.updateUserAttributes(user, updatedAttr);
            console.log(result);
            if (result === "SUCCESS") {
                sendVerificationCode('email');
            }
        } catch (error) {
            console.error(error);
            setModalContent(
                <h3>`${error.message || "Error updating email"}`</h3>

            )
            modalRef.current.open();
        }
    }

    const sendVerificationCode = async attr => {
        await Auth.verifyCurrentUserAttribute(attr);
        setModalContent(
            <>
                <h3>Verification code has been sent to {email} </h3>
                <form onSubmit={submitVerificationCode}>
                    <label htmlFor="verificationCode">Enter Verification Code</label>
                    <input type="text" name="verificationCode" />
                    <button>Submit</button>
                </form>
            </>
        )
        modalRef.current.open();
    };

    const submitVerificationCode = async (event) => {
        event.preventDefault();
        setVerificationCode(event.target.verificationCode.value.trim());
        // verificationCode change triggers editEmail()
    }

    const verifyEmail = useCallback(() => {
        Auth.verifyCurrentUserAttributeSubmit(
            'email',
            verificationCode
        )
            .then(result => {
                setModalContent(
                    <>
                        <h2>Success</h2>
                        <p>Email has been successfully verified to {result.toLowerCase()}</p>
                    </>
                );
                modalRef.current.open();
            }).catch((error) => {
                setModalContent(
                    <>
                        <h2>Error</h2>
                        <p>`${error.message || "Error updating email"}`</p>
                    </>
                );
                modalRef.current.open();
            })

    }, [verificationCode]);

    // verifyemail() called when setVerificationCode is called.
    useEffect(() => {
        if (verificationCode)
            verifyEmail()
    }, [verificationCode, verifyEmail]);

    return (
        userAttr && (
            <>
                <div className="profile-container">
                    <div className="profile-box">
                        <div className="profile-header">
                            Profile
                    </div>
                        <div className="profile-content">
                            <div className="profile-info">
                                <div className="profile-info-title">Username</div>
                                <div className="profile-info-detail">{user.username}</div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-info-title">{`Email (${userAttr.email_verified ? "Verified" : "Unverified"})`} </div>
                                <input type="text" className="profile-info-detail" name="email" value={email} onChange={handleEmailChange} />
                                <div className="profile-info-button"><button onClick={handleEditEmail}>Save</button>
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
                                <div className="profile-info-button"><button className="btn-delete">Delete</button></div>

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