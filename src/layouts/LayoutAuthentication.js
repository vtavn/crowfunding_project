import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/common/ErrorComponent";
import { useSelector } from "react-redux";

const LayoutAuthentication = (props) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user && user.email) return;

  const { children, heading = "" } = props;
  return (
    <div className="relative w-full min-h-screen p-10 bg-lite isolate dark:bg-darkbg">
      <img
        src="/ellipse.png"
        alt="bg"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[-1]"
      />
      <Link to="/" className="inline-block mb-5 lg:mb-16">
        <img srcSet="/logo.png 2x" alt="Crowfunding-app" />
      </Link>
      <div className="w-full max-w-[556px] mx-auto bg-white dark:bg-darkSecondary rounded-xl px-5 py-8 lg:px-16 lg:py-12">
        <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-text1 dark:text-white">
          {heading}
        </h1>
        {children}
      </div>
    </div>
  );
};

LayoutAuthentication.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};

export default withErrorBoundary(LayoutAuthentication, {
  FallbackComponent: ErrorComponent,
});
