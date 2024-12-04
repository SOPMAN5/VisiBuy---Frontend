import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FeedbackSchema } from "../models/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { on } from "events";
import Input from "@/ui/Input";
import { Textarea } from "@/ui/Texarea";
import { SearchableSelect } from "@/ui/SearchableSelect";

export function FeedBackForm() {
  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof FeedbackSchema>) => {};
  return (
    <div>
      <h3 className="font-Montserrat font-semibold text-secondary-foreground text-3xl">
        Update visibuy.
      </h3>
      <p className="font-OpenSans font-normal text-3xl mt-6">
        You can get in touch with us anytime via our mail{" "}
        <a
          href="mailto:support@visibuy.com"
          className="text-blue bg-background underline"
        >
          support@visibuy.com
        </a>{" "}
        or through the form below:
      </p>
      
      <Form {...form}>
        <form
          className="flex flex-col gap-6 mt-8 max-w-screen-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="joel pillar"
                    {...field}
                    className=" text-xl rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    className=" text-xl rounded-xl"
                    //   icon={<Icon name="mail" className="h-8 w-8" />}
                  />
                </FormControl>
                <FormMessage /> 
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thought with us"
                    {...field}
                    className=" text-2xl rounded-xl h-48 resize-none"
                    maxLength={250}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
