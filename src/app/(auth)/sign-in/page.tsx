"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signIn } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import {
  Button,
  Description,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

export default function SignIn() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setErrorMessage("লগইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setErrorMessage("");

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "লগইন করা যায়নি।");
      }
    } catch {
      setErrorMessage("সোশ্যাল লগইন ব্যর্থ হয়েছে।");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-8">
      <div className="w-full max-w-[450px]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#24352a]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-xs text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রয়োজনীয় সেবা অ্যাকাউন্টে
            ঢুকুন।
          </p>
        </header>

        <section className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-5 sm:p-6">
          <Form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="w-full"
            >
              <Label className="text-xs font-medium text-gray-700">
                ইমেইল
              </Label>

              <Input
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full"
              />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              isRequired
              className="w-full"
            >
              <Label className="text-xs font-medium text-gray-700">
                পাসওয়ার্ড
              </Label>

              <InputGroup className="w-full">
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete="current-password"
                  className="w-full"
                  required
                />

                <InputGroup.Suffix>
                  <Button
                    type="button"
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    aria-label={
                      isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                    }
                    onPress={() => setIsVisible((prev) => !prev)}
                  >
                    {isVisible ? (
                      <EyeSlash className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            {/* Error */}
            {errorMessage && (
              <Description className="text-sm text-red-600">
                {errorMessage}
              </Description>
            )}

            {/* Sign In */}
            <Button
              type="submit"
              className="w-full bg-[#078b43] text-white hover:bg-[#067638]"
              isDisabled={isLoading}
            >
              {isLoading ? "লগইন হচ্ছে..." : "সাইন ইন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="w-full border border-gray-200 bg-transparent text-xs text-gray-800"
              onPress={() => handleSocialLogin("google")}
            >
              <span className="font-bold text-red-500"></span>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border border-gray-200 bg-transparent text-xs text-gray-800"
              onPress={() => handleSocialLogin("github")}
            >
              <span className="font-bold"></span>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-5 text-center text-xs text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#078b43] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-[#078b43]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}