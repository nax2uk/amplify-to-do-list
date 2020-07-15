import React, { useState, useRef } from 'react';
import Modal from '../components/Modal';
import '../css/ProfilePage.css';
import { Auth } from 'aws-amplify';

const ProfilePage = ({ user, userAttr }) => {
    const modalRef = useRef();

    const [email, setEmail] = useState(userAttr?.email);
    const [modalContent, setModalContent] = useState("");
    //const [verificationForm, setVerificationForm] = useState(false);
    const [verificationCode, setVerificationCode] = useState("abc");

    const handleVCodeChange = (e) => {
        console.log("handle");
        setVerificationCode("bcd");
    }

    const submitTest = (e) => {
        console.log("submitTest");

    }
    const handleEditEmail = (e) => {
        e.preventDefault();
        //editEmail();
        setModalContent(
            <>
                <h3>Verification code has been sent to {email} </h3>
                <input type="text" name="code" value={verificationCode} onChange={handleVCodeChange} />
                <button onClick={submitTest}>Submit</button>
            </>
        )
        modalRef.current.open();
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
        //setVerificationForm(true);
        setModalContent(
            <>
                <h3>Verification code has been sent to {email} </h3>
                <label htmlFor="verificationCode">Enter Verification Code</label>
                <input type="text" name="verificationCode" value={verificationCode} onChange={handleVCodeChange} />
                <button onClick={submitVerificationCode}>Submit</button>
            </>
        )
        modalRef.current.open();
    };

    const submitVerificationCode = async () => {
        modalRef.current.close();
        setModalContent("");
        try {
            const result = await Auth.verifyCurrentUserAttributeSubmit(
                email,
                verificationCode
            );
            setModalContent(
                <>
                    <h2>Success</h2>
                    <p>Email has been successfully verified to {result.toLowerCase()}</p>
                </>
            );
            modalRef.current.open();
        } catch (error) {
            setModalContent(
                <>
                    <h2>Error</h2>
                    <p>`${error.message || "Error updating email"}`</p>
                </>
            );
            modalRef.current.open();
        }
    }

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
                                <div className="profile-info-title">Email</div>
                                <input type="text" className="profile-info-detail" name="email" value={email} onChange={handleEmailChange} />
                                <span className="verified">&nbsp;{userAttr.email_verified ? "Verified" : "Unverified"}</span>
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