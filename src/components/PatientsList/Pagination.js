import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 10,
      page: 0,
    };
  }

  handleStart() {
    this.props.onStartClick();
  }

  handleEnd() {
    this.props.onEndClick();
  }

  handleChange(page) {
    this.props.onChangePage(page);
  }

  render() {
    const { curr_page, items, tot_items } = this.props;

    let pages = Math.ceil(tot_items / items);
    let display_page = curr_page + 1;
    let display_increment = 5;
    let array = [];
    let low, high;
    let left_dots = true;
    let right_dots = true;
    let left_arrow = true;
    let right_arrow = true;

    low = display_page - display_increment;
    high = display_page + display_increment;

    console.log(display_page - 1);

    if (display_page - display_increment <= 1) {
      left_arrow = false;
      left_dots = false;
    }

    if (display_page + display_increment >= pages) {
      right_arrow = false;
      right_dots = false;
    }

    if (low < 1) {
      high = high - low;
      low = 1;
    }

    if (high > pages) {
      low = low - (high - pages);
      high = pages;
    }

    for (let index = low; index <= high; ++index) {
      array.push(index);
    }
    
    return (
      <ul className="pagination">
        {left_arrow && (
          <li>
            <button onClick={() => this.handleStart()}>&laquo;</button>
          </li>
        )}
        {left_dots && <li>...</li>}
        {array.map((item) => {
          if (item === display_page) {
            return (
              <li>
                <button className="active-page">{item}</button>
              </li>
            );
          } else {
            return (
              <li>
                <button onClick={() => this.handleChange(item - 1)}>
                  {item}
                </button>
              </li>
            );
          }
        })}
        {right_dots && <li>...</li>}
        {right_arrow && (
          <li>
            <button onClick={() => this.handleEnd(pages)}>&raquo;</button>
          </li>
        )}
      </ul>
    );
  }
}

export default Pagination;
