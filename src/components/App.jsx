import CSSModules from 'react-css-modules'
import React from 'react'
import ReactDOM from 'react-dom'
import DevTool from 'mobx-react-devtools'
import {observer} from 'mobx-react'

import About from './Login'
import NavigationBar from './NavigationBar'

import styles from './app.scss'
Object.assign(styles)

@observer
class App extends React.Component {
    render() {
        console.log("this.props.route;",this.props.route)
        var  {businessStore} = this.props.route;
        console.log("businessStore",businessStore)
        return (
            <div className={styles.container}>
                {/*<DevTool/>*/}
                <NavigationBar businessStore={businessStore}/>
                <div className={styles.content_wrapper}>
                    <div></div>
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </div>

            </div>
        );
    }
}

export default CSSModules(App, styles)