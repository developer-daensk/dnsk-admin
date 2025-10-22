"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../../Components/Shadcn/button";
import { Input } from "../../../Components/Shadcn/input";
import { Label } from "../../../Components/Shadcn/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../Components/Shadcn/card";
import { Checkbox } from "../../../Components/Shadcn/checkbox";
import { useAuthStore } from "../../../store/authStore";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";

interface RegisterFormProps {
  locale: iLocale;
}

export default function RegisterForm({ locale }: RegisterFormProps) {
  const dictionary = getDictionary(locale);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      if (!success) {
        setError(dictionary.auth.register.errors.registrationFailed);
      }
    } catch {
      setError(dictionary.auth.register.errors.general);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    acceptTerms;

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          {dictionary.auth.register.title}
        </CardTitle>
        <CardDescription className="text-center">
          {dictionary.auth.register.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                {dictionary.auth.register.firstName}
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder={dictionary.auth.register.firstNamePlaceholder}
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                {dictionary.auth.register.lastName}
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder={dictionary.auth.register.lastNamePlaceholder}
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{dictionary.auth.register.email}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={dictionary.auth.register.emailPlaceholder}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {dictionary.auth.register.password}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {dictionary.auth.register.confirmPassword}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-destructive text-sm">
                  {dictionary.auth.register.passwordMismatch}
                </p>
              )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              {dictionary.auth.register.acceptTerms}{" "}
              <Link href="/terms" className="text-primary hover:underline">
                {dictionary.auth.register.termsOfService}
              </Link>{" "}
              {dictionary.auth.register.and}{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                {dictionary.auth.register.privacyPolicy}
              </Link>
            </Label>
          </div>

          {error && (
            <div className="text-destructive bg-destructive/10 rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !isFormValid}
          >
            {isLoading
              ? dictionary.auth.register.creatingAccount
              : dictionary.auth.register.createAccount}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            {dictionary.auth.register.haveAccount}{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              {dictionary.auth.register.signIn}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
