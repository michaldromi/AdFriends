import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules'
import {observer} from 'mobx-react';
import {hashHistory} from 'react-router';
import autobind from 'autobind-decorator'
import ImageUploader from 'react-firebase-image-uploader';
import * as firebase from 'firebase';
import OfferModel from '../../models/OfferModel'
import {observable} from 'mobx';
import ReactTooltip from 'react-tooltip';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import './style.scss';


var tooltip = require('json!./info.json');

const ENTER_KEY = 13;

@observer
export default class OfferEntry extends React.Component {

    @observable
    state = {
        offer: {},
        formatedDate: {}
    }

    static PropTypes = {
        offer: PropTypes.object
    }

    componentDidMount() {

        var {offerStore} = this.props.route.businessStore;
        const offerId = this.props.params.offerId;

        if (offerId) {
            this.state.offer = offerStore.offers.find((it) => it.id == offerId);


        } else {
            this.state.offer = new OfferModel({store: this.props.route.businessStore.offerStore});
        }
    }

    shouldComponentUpdate() {

    }


    updateProperty(key, value) {
        var {offer} = this.state;
        offer[key] = value;
    }

    @autobind
    onChange(event) {
        this.updateProperty(event.target.name, event.target.value)
    }

    @autobind
    onChangeDate(event, date) {
        this.updateProperty('endingDate', date)
    }


    @autobind
    handleSubmit() {
        var {offer} = this.state;
        if (offer) {
            offer.save();
        }
    }
    ;

    @autobind
    handleNewOfferKeyDown(e) {
        e.preventDefault();
        var {offer} = this.state;
        // offer['endingDate'] = offer['endingDate'].toISOString();
        offer.save();
        // hashHistory.push('/offers');
        this.clearForm();

    };

    clearForm() {
        this.setState({description: ""});
        this.setState({title: ""});
    }


    @autobind
    handleUploadStart() {
        this.setState({isUploading: true, progress: 0});
    }

    @autobind
    handleProgress(progress) {
        this.setState({progress});
    }

    @autobind
    handleUploadError(error) {
        this.setState({isUploading: false});
        console.error(error);
    }

    @autobind
    handleUploadSuccess(filename) {
        this.setState({avatar: filename, progress: 100, isUploading: false});
        var imagesRef = firebase.storage().ref('images').child(filename);
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({imageUrl: url}));
    };

    @autobind
    goBack() {
        hashHistory.push('/offers');
    }

    render() {
        var {offer} = this.state;
        var {route} = this.props;
        if (!firebase.storage || !route.businessStore.isInitialized) {
            return null;
        }

        return (
            <div>

                <FloatingActionButton mini secondary  style={{position: 'absolute', left: 5, top: 5}} onTouchTap={() => this.goBack()}>
                    <FontIcon className="material-icons">arrow_back</FontIcon>
                </FloatingActionButton>

                <Paper style={{margin: '30px 0', padding: '10px 0'}}>
                    <form className="addItemForm">

                        <div className="row">
                            <label>Title <span data-tip={tooltip.title} data-for='title'>?</span></label>
                            <TextField name="title" defaultValue={offer.title} onChange={this.onChange}/>
                            <ReactTooltip id="title"/>
                        </div>
                        <div className="row">
                            <label>Description <span data-tip={tooltip.desc} data-for='desc'>?</span></label>
                            <TextField multiLine={true} name="description" defaultValue={offer.description}
                                       onChange={this.onChange}/>
                            <ReactTooltip id="desc"/>

                        </div>
                        <div className="row">
                            <label>Message to Client:<span data-tip={tooltip.message}
                                                           data-for='message'>?</span></label>
                            <TextField multiLine={true} name="preMessage" value={offer.preMessage}
                                       onChange={this.onChange}/>
                            <ReactTooltip id="message"/>
                        </div>
                        <div className="row">
                            <label>Terms<span data-tip={tooltip.terms} data-for='terms'>?</span></label>
                            <TextField name="terms" value={offer.terms} onChange={this.onChange}/>
                            <ReactTooltip id="terms"/>
                        </div>
                        <div className="row">
                            <label>Friend Gift<span data-tip={tooltip.giftFriend} data-for='giftFriend'>?</span></label>
                            <TextField name="offerGift" value={offer.offerGift} onChange={this.onChange}/>
                            <ReactTooltip id="giftFriend"/>
                        </div>
                        <div className="row">
                            <label>Client Gift<span data-tip={tooltip.giftClient} data-for='giftClient'>?</span></label>
                            <TextField name="clientGift" value={offer.clientGift} onChange={this.onChange}/>
                            <ReactTooltip id="giftClient"/>

                        </div>
                        <div className="row">
                            <label>Ending Date<span data-tip={tooltip.endDate} data-for='endDate'>?</span></label>
                            <DatePicker name="endingDate" value={offer.endingDate} onChange={this.onChangeDate}/>
                            <ReactTooltip id="endDate"/>
                        </div>
                        <div className="row">
                            <label>Code<span data-tip={tooltip.code} data-for='code'>?</span></label>
                            <TextField name="code" value={offer.code} onChange={this.onChange}/>
                            <ReactTooltip id="code"/>

                        </div>
                        <div className="urls">
                            {offer.urls && offer.urls.map((url) =>
                                <div>{url}</div>
                            )}
                        </div>

                        <label>
                            <ImageUploader
                                name="avatar"
                                storageRef={firebase.storage().ref('images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                        </label>


                        <RaisedButton secondary={true} style={{marginTop: 30}}
                                      onTouchTap={(e) => this.handleNewOfferKeyDown(e)}>Save</RaisedButton>

                    </form>
                </Paper>
            </div>
        )
    }
}



