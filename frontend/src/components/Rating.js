import React, { Fragment } from "react";

let Rating = ({ value, text, color, productName }) => {
  return (
    <div className="rating">
      {value > 0 ? (
        <Fragment>
          <span>
            {/*Generate 5 star ratings*/}
            {[1, 2, 3, 4, 5].map((x) => (
              <i
                key={`${productName}-star-${x}`}
                style={{ color }}
                className={
                  value >= x
                    ? "fas fa-star"
                    : value >= x - 0.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
              />
            ))}
          </span>
          <span>{text && text}</span>
        </Fragment>
      ) : (
        <span>{"No reviews have been created"}</span>
      )}
    </div>
  );
};

export default Rating;
