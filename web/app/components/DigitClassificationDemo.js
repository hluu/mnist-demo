//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import React from "react";
import { connect } from 'react-redux';

import ConnectorHorizontal from './ConnectorHorizontal';
import ConnectorVertical from './ConnectorVertical';
import ConnectorEnd from './ConnectorEnd';
import Results from './Results';
import InputCanvas from './InputCanvas';
import RescaledImage from './RescaledImage';
import { evaluate } from '../actions/EvaluateActions';
import { rescaleImagePixels, inputCleared, inputReady } from '../actions/InputActions';

const DigitClassificationDemoComponent = React.createClass({
  render: function() {
    return <main className="main-content">
      <div className="content-box">
        <div className="content-row">
          <InputCanvas onInputReady={(imageData) => {
                          this.props.evaluate(imageData)
                        }}
                       onInputCleared={this.props.onInputCleared}/>

        </div>
        <div className="content-row" id="predictions-content">
          <div className="predictions-title" style={{marginBottom: "1em"}}>
            <span>{"Predictions"}</span>
          </div>
          <Results results={this.props.convolutional}/>
        </div>
      </div>
    </main>;
  }
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { return {
  evaluate: function(imageData) { dispatch(evaluate(rescaleImagePixels(imageData, 28))); },
  onInputCleared: function() { dispatch(inputCleared()); }
}};

const DigitClassificationDemo = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DigitClassificationDemoComponent);

export default DigitClassificationDemo;
