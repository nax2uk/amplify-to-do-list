import React from 'react';
import '../css/ProfilePage.css';

const ProfilePage = ({ user, userAttr }) => {
    console.log(userAttr)
    return (
        userAttr && (
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
                            <div className="profile-info-detail">{userAttr.email}
                                <span className="verified">&nbsp;{userAttr.email_verified ? "Verified" : "Unverified"}</span>
                            </div>
                            <div className="profile-info-button"><button>Edit</button>
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
            </div>)

    );
};

export default ProfilePage;