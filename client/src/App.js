import React from 'react'

function App(props) {
    return (<div>
                {props.children}
                <div id='footer'></div>
            </div>)
}

export default App;