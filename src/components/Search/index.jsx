import React from "react";
import { Select } from "antd";
import { find, map } from "lodash";
import { SearchOutlined } from "@ant-design/icons";

import states, { statesAb } from "../../data/states";

const { Option } = Select;
const statesMap = map(statesAb, (stateName, abr) => ({
  id: abr,
  displayName: stateName,
}));

const Search = ({
  senators,
  selectSenator,
  handleStateSearch,
  handleReset,
}) => {
  function onChange(value) {
    const isState = states.includes(value);
    if (isState) {
      handleStateSearch(value);
    }
    const senator = find(senators, { id: value });
    if (senator) {
      selectSenator(senator);
    }
  }

  function onBlur() {
    //   console.log('blur');
  }

  function onFocus() {
    //   console.log('focus');
  }

  function onSearch(val) {
    //   console.log('search:', val);
  }
  return (
    <>
      <h4 className="search-label">Where do your Senators stand?</h4>

      <Select
        showSearch
        style={{ width: 300 }}
        allowClear
        showArrow={false}
        suffixIcon={<SearchOutlined />}
        placeholder="Search Senator's name"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        onClear={handleReset}
        filterOption={(input, option) => {
          return (
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          );
        }}
      >
        {[...senators, ...statesMap].map((senatorOrState) => (
          <Option key={senatorOrState.id}>{senatorOrState.displayName}</Option>
        ))}
      </Select>
    </>
  );
};

export default Search;
