import React from 'react';

const signUp = () => {
    return (
          <div className="flex flex-col justify-center items-center my-10">
            <div className="my-10 flex flex-col items-center">
                <h2 className="font-bold text-2xl">অ্যাকাউন্ট তৈরি করুন</h2>
                <p className="text-1xl text-gray-500 mt-3">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>
            <div className="flex p-10 items-center justify-center border border-green-200 rounded-2xl bg-white/80 shadow-xl backdrop-blur">
                <Form
                    className="flex w-96 flex-col gap-4"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }

                            return null;
                        }}
                    >
                        <Label>নাম</Label>
                        <Input placeholder="আপনার নাম লিখুন" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                            ) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>ইমেইল</Label>
                        <Input placeholder="আপনার ইমেইল লিখুন" />
                        <FieldError />
                    </TextField>

                    <TextField
                        name="password"
                        isRequired
                        value={password}
                        onChange={setPassword}
                        minLength={8}
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
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => setIsVisible(!isVisible)}
                                >
                                    {isVisible ? (
                                        <Eye className="size-4" />
                                    ) : (
                                        <EyeSlash className="size-4" />
                                    )}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
                        <Description>
                            Must be at least 8 characters with 1 uppercase letter and 1 number.
                        </Description>

                        <FieldError />
                    </TextField>


                    <TextField
                        name="confirmPassword"
                        isRequired
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
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    onPress={() =>
                                        setIsConfirmVisible(!isConfirmVisible)
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

                    <div className="flex flex-col items-center gap-3">
                        <Button type="submit" className="w-full">
                            অ্যাকাউন্ট তৈরি করুন
                        </Button>

                        <div className="flex w-full items-center gap-3">
                            <div className="h-px flex-1 bg-gray-300" />
                            <span className="text-sm text-gray-500">অথবা</span>
                            <div className="h-px flex-1 bg-gray-300" />
                        </div>

                        <div className="flex w-full gap-3">
                            {/* <Button
                                type="button"
                                variant="secondary"
                                className="flex-1"
                                onPress={handleGoogle}
                            >
                                🇬 Google দিয়ে চালিয়ে যান
                            </Button> */}

                            {/* <Button
                                type="button"
                                variant="secondary"
                                className="flex-1"
                                onPress={handleGithub}
                            >
                                GitHub দিয়ে চালিয়ে যান
                            </Button>kj */}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default signUp;