import React from 'react';

function Submit() {

    return (
        <div>
            <a href="http://localhost:8000/auth/google">
                <button>Sign In With Google</button>
            </a>
            <br />
            <a href="http://localhost:8000/api/logout">
                <button>Logout</button>
            </a>
        </div>
    )
}

export default Submit