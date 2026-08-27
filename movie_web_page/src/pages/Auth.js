import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {

    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Email validation
    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Indian phone validation
    const phoneRegex =
        /^[6-9][0-9]{9}$/;

    // Password validation
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;


    const handleSubmit = (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // ---------------- REGISTER ----------------

        if (isRegister) {

            if (
                name.trim() === "" ||
                email.trim() === "" ||
                phone.trim() === "" ||
                password === "" ||
                confirmPassword === ""
            ) {
                setError("Please fill all fields");
                return;
            }


            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address");
                return;
            }


            if (!phoneRegex.test(phone)) {
                setError("Please enter a valid 10-digit phone number");
                return;
            }


            if (!passwordRegex.test(password)) {
                setError(
                    "Password must contain 8 characters, one letter and one number"
                );
                return;
            }


            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            const users =
                JSON.parse(localStorage.getItem("users")) || [];


            const existingUser = users.find(
                (user) => user.email === email
            );


            if (existingUser) {
                setError("Email already registered");
                return;
            }


            const newUser = {
                name,
                email,
                phone,
                password,
                favorites: []
            };


            users.push(newUser);

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            setSuccess("Registration successful. Please login.");


            // Clear fields

            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");


            setTimeout(() => {
                setIsRegister(false);
                setSuccess("");
            }, 1500);

            return;
        }


        // ---------------- LOGIN ----------------

        if (email.trim() === "" || password === "") {
            setError("Please enter email and password");
            return;
        }


        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }


        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        const user = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );


        if (!user) {
            setError("Invalid email or password");
            return;
        }


        // Store currently logged-in user

        localStorage.setItem(
            "currentUser",
            user.email
        );


        navigate("/movies");

    };


    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md">


                {/* LOGO */}

                <div className="text-center mb-7">

                    <h1 className="text-4xl sm:text-5xl font-bold text-white">

                        Movie
                        <span className="text-cyan-400">
                            App
                        </span>

                    </h1>

                    <p className="text-gray-400 mt-2 text-sm sm:text-base">
                        Discover your favorite movies
                    </p>

                </div>


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl"
                >


                    <h2 className="text-2xl font-bold text-white text-center mb-6">

                        {isRegister ? "Create Account" : "Welcome Back"}

                    </h2>


                    {/* ERROR */}

                    {error && (

                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-5 text-sm">

                            {error}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-5 text-sm">

                            {success}

                        </div>

                    )}


                    {/* NAME */}

                    {isRegister && (

                        <div className="mb-4">

                            <label className="block text-gray-300 mb-2 text-sm">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                            />

                        </div>

                    )}


                    {/* EMAIL */}

                    <div className="mb-4">

                        <label className="block text-gray-300 mb-2 text-sm">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                        />

                    </div>


                    {/* PHONE */}

                    {isRegister && (

                        <div className="mb-4">

                            <label className="block text-gray-300 mb-2 text-sm">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                                placeholder="Enter 10-digit phone number"
                                maxLength="10"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                            />

                        </div>

                    )}


                    {/* PASSWORD */}

                    <div className="mb-4">

                        <label className="block text-gray-300 mb-2 text-sm">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter password"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                        />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    {isRegister && (

                        <div className="mb-6">

                            <label className="block text-gray-300 mb-2 text-sm">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                            />

                        </div>

                    )}


                    {/* LOGIN HAS LESS SPACE */}

                    {!isRegister && (
                        <div className="mb-6"></div>
                    )}


                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition duration-300"
                    >

                        {isRegister ? "Register" : "Login"}

                    </button>


                    {/* SWITCH */}

                    <p className="text-center text-gray-400 mt-6 text-sm">

                        {isRegister
                            ? "Already have an account?"
                            : "Don't have an account?"
                        }

                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setError("");
                                setSuccess("");
                            }}
                            className="text-cyan-400 hover:text-cyan-300 font-semibold ml-2"
                        >

                            {isRegister ? "Login" : "Register"}

                        </button>

                    </p>

                </form>

            </div>

        </div>

    );
}

export default Auth;