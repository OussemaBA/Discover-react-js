import { Dropdown, Menu } from "semantic-ui-react";
import React, { Component } from "react";
import { getDatafromDataBase } from "./HomeApi";
import Autosuggestion from "./Autosuggestion";

const options = [
  { key: 1, text: "All", value: 1 },
  { key: 2, text: "Hotels", value: 2 },
  { key: 3, text: "Auto Repair", value: 3 },
  { key: 4, text: "restaurants", value: 4 },
  { key: 5, text: "Beauty & Spas", value: 5 }
];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      text: "All",
      searchKey: "",
      result: []
    };
  }

  handleChange = (e, { value }) => {
    const text = e.target.textContent;
    getDatafromDataBase(text).then(res => {
      this.setState({ value, text: text, result: res.data });
    });
  };

  componentDidMount() {
    getDatafromDataBase(this.state.text).then(res => {
      this.setState({ text: this.state.text, result: res.data });
    });
  }

  handleInputChange = event => {
    this.setState({ searchKey: event.target.value });
  };

  render() {
    const { value, result } = this.state;

    return (
      <div  >
        <Menu compact   widths={2}  style={{backgroundColor: 'rgba(0,0,0,0.2)',width:"70%"}} centred>
          <Menu.Item >
            <Dropdown
              

              floating
              options={options}
              defaultValue="food"
              onChange={this.handleChange}
              value={value}
            />
          </Menu.Item>

          <Menu.Item   >
            <Autosuggestion source={result} fluid />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SearchBar;
