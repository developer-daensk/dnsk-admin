"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../Components/Shadcn/card";
import { iLocale } from "@/Components/Entity/Locale/types";
import LoginForm from "./Components/LoginForm";
import OtpCodeInput from "./Components/OtpCodeInput";
import Link from "next/link";
import { getDictionary } from "./i18n";

interface LoginFormContainerProps {
  locale: iLocale;
}

type AuthStep = "email" | "code";

export default function LoginFormContainer({
  locale,
}: LoginFormContainerProps) {
  const dictionary = getDictionary(locale);
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const handleEmailSubmitted = (submittedEmail: string, userIsNew: boolean) => {
    setEmail(submittedEmail);
    setIsNewUser(userIsNew);
    setStep("code");
  };

  const handleBackToEmail = () => {
    setStep("email");
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          {step === "email"
            ? dictionary.auth.login.title
            : dictionary.auth.login.codeStep.title}
        </CardTitle>
        <CardDescription className="text-center">
          {step === "email"
            ? dictionary.auth.login.description
            : dictionary.auth.login.codeStep.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "email" ? (
          <LoginForm locale={locale} onEmailSubmitted={handleEmailSubmitted} />
        ) : (
          <OtpCodeInput
            locale={locale}
            email={email}
            isNewUser={isNewUser}
            onBackToEmail={handleBackToEmail}
          />
        )}

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            {dictionary.auth.login.noAccount}{" "}
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              {dictionary.auth.login.signUp}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
