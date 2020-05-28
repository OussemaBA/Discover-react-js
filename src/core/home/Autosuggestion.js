import _ from "lodash";
import React, { Component } from "react";
import { Search, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
const initialState = {
  isLoading: false,
  results: [],
  value: "",
  redirect: null
};

const resultRenderer = ({ businessName, categories }) => (
  <Label.Group size="small">
    <Label content={businessName} />
    <Label color="red" content={categories[0]} />
  </Label.Group>
);

resultRenderer.propTypes = {
  businessName: PropTypes.string,
  address: PropTypes.string
};

export default class Autosuggestion extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.businessName, redirect: result._id });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.businessName);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results, redirect } = this.state;

    if (redirect !== null) {
      return (
        <Redirect to={{ pathname: "/BizPage", state: { _id: redirect } }} />
      );
    }
    return (
      <Search 
      
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        resultRenderer={resultRenderer}
        results={results}
        value={value}
      />
    );
  }
}
