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
import { inputUpdated, inputCleared, inputReady } from '../actions/InputActions';

const DigitClassificationDemoComponent = React.createClass({
  render: function() {
    return <main className="main-content">
      <div className="input-row">
        <InputCanvas onInputReady={() => this.props.evaluate(this.props.rescaled_input)}
                     onInputUpdated={this.props.onInputUpdated}
                     onInputCleared={this.props.onInputCleared}/>

      </div>
      <div className="output-row">
        <Results title="Predictions" results={this.props.convolutional}/>
      </div>
    </main>;
  }
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { return {
  evaluate: function(input) { dispatch(evaluate(input)); },
  onInputUpdated: function(imageData, size) { dispatch(inputUpdated(imageData, size)); },
  onInputCleared: function() { dispatch(inputCleared()); }
}};

const DigitClassificationDemo = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DigitClassificationDemoComponent);

export default DigitClassificationDemo;
