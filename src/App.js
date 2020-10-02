import React from 'react';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                {this.props.children}
            </div>
        );
    }
}

export default App;
