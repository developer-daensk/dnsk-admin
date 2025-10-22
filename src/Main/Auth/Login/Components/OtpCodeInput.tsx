"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../../Components/Shadcn/button";
import { Input } from "../../../../Components/Shadcn/input";
import { Label } from "../../../../Components/Shadcn/label";
import { useAuthStore } from "../../../../store/authStore";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "../i18n";
import { appRoutes } from "@/lib/routes/appRoutes";

interface OtpCodeInputProps {
  locale: iLocale;
  email: string;
  isNewUser: boolean;
  onBackToEmail: () => void;
}

export default function OtpCodeInput({
  locale,
  email,
  isNewUser,
  onBackToEmail,
}: OtpCodeInputProps) {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const { sendOtpCode, verifyOtpCode, isAuthenticated } = useAuthStore();

  const validateCode = (code: string): boolean => {
    // Check if code is exactly 6 digits and contains only numbers
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(code);
  };

  // Real-time code validation
  useEffect(() => {
    setIsCodeValid(validateCode(code));
  }, [code]);

  // Auto-focus code input when component mounts
  useEffect(() => {
    if (codeInputRef.current) {
      // Small delay to ensure the input is rendered
      const timer = setTimeout(() => {
        codeInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Redirect to dashboard when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(appRoutes.dashboard.home(locale));
    }
  }, [isAuthenticated, router, locale]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input and limit to 6 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateCode(code)) {
      setError(dictionary.auth.login.errors.invalidCode);
      setIsLoading(false);
      return;
    }

    try {
      const success = await verifyOtpCode(email, code, isNewUser);
      if (!success) {
        // Show more specific error message for invalid/expired codes
        setError(dictionary.auth.login.errors.invalidCode);
      }
      // Don't redirect here - let the useEffect handle it when isAuthenticated changes
    } catch (error: unknown) {
      // Handle different types of errors
      const errorMessage = error instanceof Error ? error.message : "";
      if (errorMessage.includes("expired")) {
        setError(dictionary.auth.login.errors.codeExpired);
      } else if (errorMessage.includes("invalid")) {
        setError(dictionary.auth.login.errors.invalidCode);
      } else {
        setError(dictionary.auth.login.errors.general);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await sendOtpCode(email);
      if (result.success) {
        // Reset code input after resending
        setCode("");
        // Optionally show success message
        console.log("Code resent successfully");
      } else {
        setError(dictionary.auth.login.errors.codeSendFailed);
      }
    } catch {
      setError(dictionary.auth.login.errors.general);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setCode("");
    setError("");
    onBackToEmail();
  };

  return (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">{dictionary.auth.login.codeStep.title}</Label>
        <Input
          ref={codeInputRef}
          id="code"
          type="text"
          placeholder={dictionary.auth.login.verificationCodePlaceholder}
          value={code}
          onChange={handleCodeChange}
          required
          disabled={isLoading}
          maxLength={6}
          className="text-center text-lg tracking-widest"
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p className="mb-2">
          Code sent to: <strong>{email}</strong>
        </p>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="text-primary hover:underline"
        >
          {dictionary.auth.login.resendCode}
        </button>
      </div>

      {error && (
        <div className="text-destructive bg-destructive/10 rounded-md p-3 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !isCodeValid}
      >
        {isLoading
          ? dictionary.auth.login.verifyingCode
          : dictionary.auth.login.verifyCode}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleBackToEmail}
        disabled={isLoading}
      >
        {dictionary.auth.login.backToEmail}
      </Button>
    </form>
  );
}
