import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { useFormWithValidation, formSchema } from "../hooks/useFormValidation";

import CalendarField from "./InputFields/CalendarInput";
import {
  FormInputField,
  WorkTypeSelectField,
} from "./InputFields/FormInputField";

import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useToast } from "./ui/use-toast";

// Move handleBeforeUnload outside the component
const handleBeforeUnload = (event) => {
  event.preventDefault();
  event.returnValue = ""; // This line is needed to show the confirmation message in some browsers.
};

export function ApplicationForm() {
  const form = useFormWithValidation({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    email: "",
    residentialAddress: "",
    state: "",
    city: "",
    zipCode: "",
    typeOfWork: "",
    frontIdUpload: "",
    backIdUpload: "",
    reasonForApplying: "",
  });

  // Define a submit handler.
  const { toast } = useToast();
  const onSubmit = async (values) => {
    // Upload frontIdUpload and backIdUpload files to Cloudinary
    const frontImage = document.getElementById("frontIdUpload");
    const frontImageFiles = frontImage.files[0];
    const frontFormData = new FormData();

    frontFormData.append("file", frontImageFiles);
    frontFormData.append("upload_preset", "formImages");

    const frontUploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/personalbucket/auto/upload",
      {
        method: "POST",
        body: frontFormData,
      }
    ).then((res) => res.json());

    // Upload backIdUpload file to Cloudinary
    const backImage = document.getElementById("backIdUpload");
    const backImageFiles = backImage.files[0];
    const backFormData = new FormData();

    backFormData.append("file", backImageFiles);
    backFormData.append("upload_preset", "formImages");

    const backUploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/personalbucket/auto/upload",
      {
        method: "POST",
        body: backFormData,
      }
    ).then((res) => res.json());

    // Attach the Cloudinary URLs to the form data
    values.frontIdUpload = frontUploadResponse;
    values.backIdUpload = backUploadResponse;
    values.dob = values.dob.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toast({
        description: "Form submitted successfully",
      });
      form.reset();
    }
    if (!response.ok) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem. Please try again.",
      });
    }
  };

  // Add the beforeunload event listener when the component mounts
  useEffect(() => {
    if (form.formState.isDirty) {
      window.onbeforeunload = handleBeforeUnload;
    } else {
      window.onbeforeunload = null;
    }

    // Remove the beforeunload event listener when the component unmounts
    return () => {
      window.onbeforeunload = null;
    };
  }, [form.formState.isDirty]);

  return (
    <Form {...form}>
      <form
        id="apply"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 shadow-[0_2px_10px] shadow-slate-300 outline-none rounded-lg px-2 py-5"
      >
        <FormInputField
          control={form.control}
          name="firstName"
          placeholder="First Name"
          required
          type="text"
          errors={form.formState.errors}
        />
        <FormInputField
          control={form.control}
          name="lastName"
          placeholder="Last name"
          required
          type="text"
          errors={form.formState.errors}
        />
        <CalendarField
          control={form.control}
          name="dob"
          formLabel="Date of Birth"
          required
          errors={form.control.errors}
        />
        <FormInputField
          control={form.control}
          name="phoneNumber"
          placeholder="Phone Number"
          required
          type="text"
          errors={form.formState.errors}
        />
        <FormInputField
          control={form.control}
          name="email"
          placeholder="Email"
          required
          type="text"
          errors={form.formState.errors}
        />
        <FormInputField
          control={form.control}
          name="residentialAddress"
          placeholder="Residential Address"
          required
          type="text"
          errors={form.formState.errors}
        />
        <FormInputField
          control={form.control}
          name="state"
          placeholder="State"
          required
          type="text"
          errors={form.formState.errors}
        />
        <div className="flex justify-between w-full grid-cols-2 gap-5 ">
          <FormInputField
            control={form.control}
            name="city"
            placeholder="City"
            required
            className="!w-full"
            type="text"
            errors={form.formState.errors}
          />
          <FormInputField
            control={form.control}
            name="zipCode"
            placeholder="Zip Code"
            required
            className="!w-full"
            type="text"
            errors={form.formState.errors}
          />
        </div>
        <WorkTypeSelectField
          name="typeOfWork"
          label="Type of Work"
          workTypes={formSchema.shape.typeOfWork._def.values}
          errors={form.formState.errors}
        />
        <FormInputField
          control={form.control}
          name="frontIdUpload"
          placeholder="Valid Identification Card (Front)"
          type="file"
          id="frontIdUpload"
          errors={form.formState.errors}
        />
        <FormInputField
          control={form.control}
          name="backIdUpload"
          placeholder="Valid Identification Card (Back)"
          type="file"
          id="backIdUpload"
          fieldarea="input"
          errors={form.formState.errors}
        />
        <FormInputField
          control={form.control}
          name="reasonForApplying"
          placeholder="Why should you be employed?"
          required
          type="text"
          textarea={true}
          errors={form.formState.errors}
        />
        {form.formState.isSubmitting ? (
          <Button className="m-auto w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting
          </Button>
        ) : (
          <Button type="submit" className="m-auto w-full">
            Submit
          </Button>
        )}{" "}
      </form>
    </Form>
  );
}
