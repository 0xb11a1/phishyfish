"use client";
import { Inter } from "next/font/google";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { Button } from "@nextui-org/react";

function ConfigView() {
  const [autoMode, setAutoMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    get_automode();
  }, []);

  const blockIP = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`${process.env.API_URL}/ipblock/${values.IP}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "X-API-Key": getCookie("API_KEY"),
        },
      });
      toast.success(`See you later ${values.IP}`);
    } catch (error) {
      toast.error(`Error when blocking ${isChecked}`);
    }
  };

  const send_automode = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/automode/${isChecked}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "X-API-Key": getCookie("API_KEY"),
        },
      });
    } catch (error) {}
    toast.success(`audo mode is ${isChecked}`);
  };

  const get_automode = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/automode`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "X-API-Key": getCookie("API_KEY"),
        },
      });
      // i have no idea where i got true and false mixed up, but this work for now :)
      if (JSON.parse(await res.json()).automode == "True") {
        setIsChecked(false);
      } else {
        setIsChecked(true);
      }
    } catch (error) {}
    toast.success(`Loading configurations`);
  };

  const onAutoMode = () => {
    setIsChecked(!isChecked);
    send_automode();
    console.log("radio", isChecked);
  };

  return (
    <div>
      <div className="flex flex-row self-center justify-center space-x-5">
        <label className="items-center cursor-pointer justify-center self-center flex flex-col">
          <input
            type="checkbox"
            checked={!isChecked}
            className="sr-only peer"
            onChange={onAutoMode}
          ></input>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Auto mode
          </span>
        </label>
        <Formik
          initialValues={{
            IP: "",
          }}
          onSubmit={blockIP}
        >
          <Form className="flex justify-center content-center ">
            <div className="">
              <Field
                id="IP"
                name="IP"
                placeholder="1.3.3.7 | 1.3.7.0/24"
                type="text"
                className="form-control h-10  m-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded-l-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-600"
              />
            </div>
            <Button type="submit" color="danger" className="rounded-l-none m-1">
              Bløck
            </Button>
          </Form>
        </Formik>
      </div>
      <hr class="h-px my-8 bg-gray-600 border-0" />
    </div>
  );
}

export default ConfigView;
