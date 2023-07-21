"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { toast } from "./ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date(),
  phoneNumber: z.string().min(10),
  email: z.string().email(),
  homeAddress: z.string(),
  state: z.string(),
  city: z.string(),
  zipCode: z.string().length(5),
  typeOfWork: z.enum(["Option1", "Option2", "Option3"]),
  frontIdUpload: z.string(),
  backIdUpload: z.string(),
  reasonForApplying: z.string(),
});

export function ApplicationForm() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      phoneNumber: "",
      email: "",
      homeAddress: "",
      state: "",
      city: "",
      zipCode: "",
      typeOfWork: "",
      frontIdUpload: "",
      backIdUpload: "",
      reasonForApplying: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        id="apply"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 shadow-[0_2px_10px] shadow-slate-300 outline-none rounded-lg px-2 py-5"
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "m-auto pl-3 text-left font-normal w-full ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Phone Number" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel type="text" className="hidden">
                Home Address
              </FormLabel>
              <FormControl>
                <Input placeholder="Home Address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">State</FormLabel>
              <FormControl>
                <Input type="text" placeholder="State" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-between w-full grid-cols-2 gap-5 ">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="hidden">City</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="City" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            className="!w-full"
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="hidden">Zip Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Zip Code" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="typeOfWork"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Type (Part-time or Full-time)</FormLabel>
              <Select>
                <SelectTrigger className="m-auto w-full">
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Work Type</SelectLabel>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frontId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="Valid Identification Card (Front)">
                Valid Identification Card (Front)
              </FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="backId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="Valid Identification Card (Back)">
                Valid Identification Card (Back)
              </FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">
                Why should you be employed?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Give a reason why you should be employed"
                  className="resize-none h-28"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="m-auto w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submit
        </Button>
      </form>
    </Form>
  );
}
