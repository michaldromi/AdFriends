import React from 'react'
import ReactDOM from 'react-dom'
import DevTool from 'mobx-react-devtools'
import {observer} from 'mobx-react'
import {observable} from 'mobx';
import {Link} from 'react-router';
import NavigationBar from './NavigationBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './app.scss'

@observer
export default class Content extends React.Component {




    render() {
        var {businessStore} = this.props,
            contentWrapperClass =  businessStore.isLoggedIn ? 'contentWrapper' : 'contentWrapper logout';


		return (

            <div className={contentWrapperClass}>

                <NavigationBar businessStore={businessStore} />


                <div className="wrapper">
                    <div></div>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <div className="Overlay"></div>
                </div>
            </div>
        );
    }
}

