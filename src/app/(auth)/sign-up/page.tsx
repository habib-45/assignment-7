"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signUp, signIn } from "@/lib/auth-client";

import { Eye, EyeSlash } from "@gravity-ui/icons";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

export default function SignUp() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setErrorMessage("");


    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const passwordValue = formData.get("password")?.toString() ?? "";
    const confirmPassword =
      formData.get("confirmPassword")?.toString() ?? "";

    if (name.length < 3) {
      setErrorMessage("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    if (passwordValue.length < 8) {
      setErrorMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (!/[A-Z]/.test(passwordValue)) {
      setErrorMessage("পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর দিন।");
      return;
    }

    if (!/[0-9]/.test(passwordValue)) {
      setErrorMessage("পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা দিন।");
      return;
    }

    if (passwordValue !== confirmPassword) {
      setErrorMessage("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        email,
        password: passwordValue,
        callbackURL: "/sign-in",
      });

      if (error) {
        setErrorMessage(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      router.push("/sign-in");
      router.refresh();
    } catch {
      setErrorMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }

  };

  const handleGoogle = async () => {
    setErrorMessage("");
    setIsLoading(true);


    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Google দিয়ে চালিয়ে যাওয়া যায়নি।"
        );
      }
    } catch {
      setErrorMessage("Google Sign Up ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

   const handleGithub = async()=> {
    const resData = await signIn.social({
      provider: 'github'
    })
  }


  return (<div className="flex min-h-screen flex-col items-center bg-green-50/50 px-4 py-6 sm:px-6 sm:py-10"> <div className="my-6 flex flex-col items-center text-center sm:my-10"> <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
    অ্যাকাউন্ট তৈরি করুন </h2>


    <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
      বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
    </p>
  </div>

    <div className="max-w-lg rounded-2xl border border-green-200 bg-white/90 p-5 shadow-xl backdrop-blur sm:p-8 md:p-10">
      <Form
        className="flex w-full flex-col gap-5"
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name="name"
          className="w-full"
          validate={(value) => {
            if (value.trim().length < 3) {
              return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
            }
            return null;
          }}
        >
          <Label>নাম</Label>
          <Input
            className="w-full"
            placeholder="আপনার নাম লিখুন"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "সঠিক ইমেইল ঠিকানা লিখুন";
            }
            return null;
          }}
        >
          <Label>ইমেইল</Label>
          <Input
            className="w-full"
            placeholder="আপনার ইমেইল লিখুন"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          className="w-full"
          value={password}
          onChange={setPassword}
          validate={(value) => {
            if (value.length < 8) {
              return "কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন";
            }
            if (!/[A-Z]/.test(value)) {
              return "কমপক্ষে ১টি বড় হাতের ইংরেজি অক্ষর দিন";
            }
            if (!/[0-9]/.test(value)) {
              return "কমপক্ষে ১টি সংখ্যা দিন";
            }
            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>

          <InputGroup>
            <InputGroup.Input
              name="password"
              placeholder="আপনার পাসওয়ার্ড দিন"
              type={isVisible ? "text" : "password"}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                type="button"
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label={isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                onPress={() => setIsVisible((prev) => !prev)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <Description className="text-xs leading-5 text-gray-500">
            কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের ইংরেজি অক্ষর (A–Z)
            এবং ১টি সংখ্যা (0–9) থাকতে হবে।
          </Description>

          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="confirmPassword"
          className="w-full"
          validate={(value) => {
            if (value !== password) {
              return "পাসওয়ার্ড মিলছে না";
            }
            return null;
          }}
        >
          <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>

          <InputGroup>
            <InputGroup.Input
              name="confirmPassword"
              placeholder="আবার পাসওয়ার্ড লিখুন"
              type={isConfirmVisible ? "text" : "password"}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                type="button"
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label={
                  isConfirmVisible
                    ? "নিশ্চিতকরণ পাসওয়ার্ড লুকান"
                    : "নিশ্চিতকরণ পাসওয়ার্ড দেখুন"
                }
                onPress={() =>
                  setIsConfirmVisible((prev) => !prev)
                }
              >
                {isConfirmVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <FieldError />
        </TextField>

        {errorMessage && (
          <p
            role="alert"
            className="w-full rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-green-700 text-white hover:bg-green-800"
          isDisabled={isLoading}
        >
          {isLoading
            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
            : "অ্যাকাউন্ট তৈরি করুন"}
        </Button>

        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="shrink-0 text-sm text-gray-500">
            অথবা
          </span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

         <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="w-full border border-gray-200 bg-transparent text-xs text-gray-800"
              onClick={handleGoogle}
            >
              <span className="font-bold text-red-500"></span>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border border-gray-200 bg-transparent text-xs text-gray-800"
              onClick={handleGithub}
            >
              <span className="font-bold"></span>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>
      </Form>

      <div className="mt-6 text-center text-sm text-gray-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-green-700 hover:text-green-800 hover:underline"
        >
          লগইন করুন
        </Link>
      </div>
    </div>

    <p className="mt-6 text-center text-xs text-gray-500">
      অ্যাকাউন্ট তৈরি করে আপনি আমাদের শর্তাবলিতে সম্মতি দিচ্ছেন।
    </p>
  </div>

  );
}
