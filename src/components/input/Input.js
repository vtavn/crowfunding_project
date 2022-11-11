import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import classNames from "utils/classNames";

const Input = (props) => {
  const {
    control,
    name,
    type = "text",
    error = "",
    placeholder = "",
    children,
    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        className={classNames(
          "w-full px-6 py-4 text-sm font-medium border rounded-xl text-text1 dark:bg-transparent placeholder:text-text4 dark:placeholder:text-text2 dark:text-white",
          error.length > 0
            ? "border-error"
            : "border-strock dark:border-darkStroke",
          children ? "pr-16" : ""
        )}
        placeholder={error.length > 0 ? "" : placeholder}
        {...field}
        {...rest}
      />
      {error.length > 0 && (
        <span className="absolute text-sm font-medium pointer-events-none error-input text-error top-2/4 -translate-y-2/4 left-6">
          {error}
        </span>
      )}
      {children && (
        <span className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
          {children}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.any.isRequired,
};

export default withErrorBoundary(Input, {
  FallbackComponent: ErrorComponent,
});
