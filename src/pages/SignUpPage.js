import useToggleValue from "hooks/useToggleValue";
import React from "react";
import LayoutAuthentication from "layouts/LayoutAuthentication";
import Label from "components/label/Label";
import Input from "components/input/Input";
import IconEyeToggle from "components/icons/IconEyeToggle";
import FormGroup from "components/common/FormGroup";
import Checkbox from "components/checkbox/Checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "components/button";
import { ButtonGoogle } from "components/button";
import { useDispatch } from "react-redux";
import { authRegister } from "store/auth/auth-slice";

const schema = yup.object({
  name: yup.string().required("This field is required"),
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character "),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  const dispatch = useDispatch();

  const handleSignUp = async (values) => {
    try {
      dispatch(authRegister({ ...values, permissions: [] }));
      reset({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutAuthentication heading="Sign Up">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Already have an account?
        <Link to="/sign-in" className="font-medium underline text-primary">
          {" "}
          Sign in
        </Link>
      </p>
      <ButtonGoogle></ButtonGoogle>
      <p className="mb-4 text-xs text-center font-nomarl lg:text-sm lg:mb-8 text-text2 dark:text-white">
        Or sign up with email
      </p>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormGroup>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            control={control}
            name="name"
            placeholder="John Doe"
            error={errors.name?.message}
          ></Input>
        </FormGroup>

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

        <Checkbox name="term" checked={acceptTerm} onClick={handleToggleTerm}>
          <p className="flex-1 text-xs lg:text-sm text-text2 dark:text-text3">
            I agree to the{" "}
            <span className="underline text-secondary">Tearms of Use</span> and
            have read and understand the{" "}
            <span className="underline text-secondary">Privacy policy</span>.
          </p>
        </Checkbox>

        <Button type="submit" className="w-full" kind="primary">
          Create my account
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
