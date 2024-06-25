// @ts-nocheck
import { Input } from "antd";
import ReactInputMask from "react-input-mask";
import PropTypes from "prop-types";

const InputMask = (props) => {
  return (
    <ReactInputMask {...props}>
      {(inputProps) => (
        <Input
          {...inputProps}
          disabled={props.disabled ? props.disabled : null}
        />
      )}
    </ReactInputMask>
  );
};

InputMask.propTypes = {
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  formatChars: PropTypes.object,
  alwaysShowMask: PropTypes.bool,
  inputRef: PropTypes.func,
};

export default InputMask;
