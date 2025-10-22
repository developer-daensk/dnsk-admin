"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../Components/Shadcn/button";
import { Input } from "../../../../Components/Shadcn/input";
import { Label } from "../../../../Components/Shadcn/label";
import { useAuthStore } from "../../../../store/authStore";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "../i18n";

interface LoginFormProps {
  locale: iLocale;
  onEmailSubmitted: (email: string, isNewUser: boolean) => void;
}

export default function LoginForm({
  locale,
  onEmailSubmitted,
}: LoginFormProps) {
  const dictionary = getDictionary(locale);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email validation states
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [hasEmailBeenTouched, setHasEmailBeenTouched] = useState(false);

  const { sendOtpCode } = useAuthStore();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Real-time email validation
  useEffect(() => {
    if (email.trim() === "") {
      setEmailError("");
      setIsEmailValid(false);
      return;
    }

    if (validateEmail(email)) {
      setEmailError("");
      setIsEmailValid(true);
    } else {
      setEmailError(dictionary.auth.login.errors.invalidEmail);
      setIsEmailValid(false);
    }
  }, [email, dictionary.auth.login.errors.invalidEmail]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Mark email as touched when user starts typing
    if (!hasEmailBeenTouched && value.length > 0) {
      setHasEmailBeenTouched(true);
    }

    // Clear general error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleEmailBlur = () => {
    setHasEmailBeenTouched(true);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateEmail(email)) {
      setError(dictionary.auth.login.errors.invalidEmail);
      setIsLoading(false);
      return;
    }

    try {
      const result = await sendOtpCode(email);
      if (result.success) {
        onEmailSubmitted(email, result.isNewUser);
      } else {
        setError(dictionary.auth.login.errors.codeSendFailed);
      }
    } catch {
      setError(dictionary.auth.login.errors.general);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSendCode} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{dictionary.auth.login.email}</Label>
        <Input
          id="email"
          type="email"
          placeholder={dictionary.auth.login.emailPlaceholder}
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
          disabled={isLoading}
          className={
            hasEmailBeenTouched && emailError
              ? "border-destructive focus:border-destructive"
              : ""
          }
        />
        {/* Inline email validation error */}
        {hasEmailBeenTouched && emailError && (
          <p className="text-sm text-destructive mt-1">{emailError}</p>
        )}
      </div>

      {/* General error (for API errors) */}
      {error && (
        <div className="text-destructive bg-destructive/10 rounded-md p-3 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !isEmailValid || email.trim() === ""}
      >
        {isLoading
          ? dictionary.auth.login.sendingCode
          : dictionary.auth.login.sendCode}
      </Button>
    </form>
  );
}
