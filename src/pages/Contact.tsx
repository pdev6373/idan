import React from "react";
import { Navbar } from "../components/Navbar";
import { ContactInfo } from "../components/ContactInfo";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";


export const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="text-center w-[936px] flex flex-col  mx-auto my-8">
        <h1 className="text-black text-center font-bold text-3xl leading-normal my-2">
          Contact our Friendly team.
        </h1>
        <p className="my-2 text-black text-center text-base font-normal leading-normal">
          We're here to support you every step of the way. If you have any
          questions, need assistance, or want more information, our dedicated
          customer support team is ready to help. Feel free to reach out to us
          via email, phone, or by using the contact form below.
        </p>
      </div>
      <section className="flex px-6 items-center gap-24 rounded-lg bg-white max-w-[1330px] mx-auto shadow-md my-12">
        <ContactInfo />
        <ContactForm />
      </section>
      <Footer />
    </>
  );
};
