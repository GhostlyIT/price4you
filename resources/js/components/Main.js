import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './auth/Auth';

const Main = () => {
    return (
        <div className="main position-relative">
            <div className="main-background" />
            <div className="container">
                <Auth />
            </div>
        </div>
    );
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
