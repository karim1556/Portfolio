import React, { useEffect, Suspense, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Canvas } from "@react-three/fiber";

import { Fox } from "../models/Fox";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  message: Yup.string().required("Message is required"),
  hCaptchaToken: Yup.string().required("Please complete the hCaptcha"),
});

const Contact = () => {
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://hcaptcha.com/1/api.js";
    script.async = true;
    document.body.appendChild(script);

    window.handleCaptcha = (token) => {
      formik.setFieldValue("hCaptchaToken", token);
    };

    window.handleCaptchaExpire = () => {
      formik.setFieldValue("hCaptchaToken", "");
    };

    return () => {
      document.body.removeChild(script);
      delete window.handleCaptcha;
      delete window.handleCaptchaExpire;
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      hCaptchaToken: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      setCurrentAnimation("hit");

      fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        showAlert({
          show: true,
          text: "Thank you for your message 😃",
          type: "success",
        });

        setTimeout(() => {
          hideAlert(false);
          setCurrentAnimation("idle");
          resetForm();
          window.hcaptcha.reset(); // Reset hCaptcha after successful form submission
        }, 3000);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        setCurrentAnimation("idle");

        showAlert({
          show: true,
          text: "An error occurred, please try again later",
          type: "error",
        });
      });
    },
  });

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-7 mt-14'>
          <label className='text-black-500 font-semibold'>
            Name
            <input
              type='text'
              name='name'
              className='input'
              placeholder='Karim'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={() => setCurrentAnimation("walk")}
              onBlur={() => setCurrentAnimation("idle")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='karim@gmail.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={() => setCurrentAnimation("walk")}
              onBlur={() => setCurrentAnimation("idle")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
              name='message'
              rows='4'
              className='textarea'
              placeholder='Write your Message here ...'
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={() => setCurrentAnimation("walk")}
              onBlur={() => setCurrentAnimation("idle")}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="error">{formik.errors.message}</div>
            ) : null}
          </label>

          <div
            className="h-captcha"
            data-sitekey="064a583a-75b2-4d94-befc-efd231e8e680"
            data-callback="handleCaptcha"
            data-expired-callback="handleCaptchaExpire"
          ></div>
          {formik.touched.hCaptchaToken && formik.errors.hCaptchaToken ? (
            <div className="error">{formik.errors.hCaptchaToken}</div>
          ) : null}

          <button
            type='submit'
            disabled={loading}
            className='btn'
            onFocus={() => setCurrentAnimation("walk")}
            onBlur={() => setCurrentAnimation("idle")}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}

            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
