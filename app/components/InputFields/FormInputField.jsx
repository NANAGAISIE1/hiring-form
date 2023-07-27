"use client";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function FormInputField({
  control,
  name,
  placeholder,
  className,
  type,
  id,
  textarea,
  errors, // Receive the errors object from react-hook-form
  children,
}) {
  return (
    <FormField
      control={control}
      name={name}
      required
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea
                placeholder="Give a reason why you should be employed"
                className="resize-none h-28"
                {...field}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                id={id}
                {...children}
              />
            )}
          </FormControl>
          {errors && <FormMessage />}
        </FormItem>
      )}
    />
  );
}

function WorkTypeSelectField({ name, label, workTypes, errors, control }) {
  return (
    <FormField
      control={control}
      name={name}
      required
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select work type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {workTypes.map((enumValue) => (
                  <SelectItem key={enumValue} value={enumValue}>
                    {enumValue}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors[name] && <FormMessage />}
          <FormDescription>Choose your preferred option</FormDescription>
        </FormItem>
      )}
    />
  );
}

export { FormInputField, WorkTypeSelectField };
