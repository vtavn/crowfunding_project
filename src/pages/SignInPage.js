import { ButtonGoogle } from "components/button";
import React from "react";
import { Link } from "react-router-dom";
import LayoutAuthentication from "../layouts/LayoutAuthentication";
import Label from "components/label/Label";
import Input from "components/input/Input";
import IconEyeToggle from "components/icons/IconEyeToggle";
import FormGroup from "components/common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "components/button";
import useToggleValue from "hooks/useToggleValue";

const schema = yup.object({
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character "),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  const handleSignIn = (values) => {
    console.log(values);
  };

  return (
    <LayoutAuthentication heading="Welcome Back!">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Dont have an account?{" "}
        <Link to="/sign-up" className="font-medium underline text-primary">
          {" "}
          Sign up
        </Link>
      </p>
      <ButtonGoogle text="Sign in with google"></ButtonGoogle>

      <form onSubmit={handleSubmit(handleSignIn)}>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Create a password"
            error={errors.password?.message}
          >
            <IconEyeToggle open={showPassword} onClick={handleTogglePassword} />
          </Input>
        </FormGroup>

        <FormGroup>
          <span className="inline-block text-sm font-medium text-right text-primary">
            <Link to="/">Forgot Password</Link>
          </span>
        </FormGroup>

        <Button type="submit" className="w-full" kind="primary">
          Sign in
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
