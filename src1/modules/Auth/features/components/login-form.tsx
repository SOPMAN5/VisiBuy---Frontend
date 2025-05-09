import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginErrorResponse, LoginSchema } from "../../models/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/Form";
import { useToast } from "../../../../ui/use-toast";
import Input from "../../../../ui/Input";
import { Button } from "../../../../ui/Button";
import { Loader2, MoveRight } from "lucide-react";
import { Checkbox } from "../../../../ui/Checkbox";
import { useLogin } from "../../mutations/use-login";
import { Link } from "react-router-dom";
import Icon from "../../../../ui/Icon";

export function LoginForm() {
  const { toast, toasts } = useToast();
  const loginMutation = useLogin();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    defaultValues: {
      pass: "",
      email: "",
      role: "seller",
      isRemeberChecked: false,
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      await loginMutation.mutateAsync(values);
    } catch (error: any) {
      console.log(error?.response.data.msg);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response.data.msg,
        duration: 5000,
      });
    }
  };
  return (
    <div className='w-[50%]'>
      <h2 className='text-secondary-foreground font-bold text-5xl font-Montserrat'>
        Welcome back!
      </h2>
      <p className='text-secondary-foreground text-xl font-OpenSans mt-4'>
        Please enter your login details.
      </p>
      <div className='border-border border p-8 mt-8 rounded-2xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-start text-xl'>
                    Email/Phone Number
                    <span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Email'
                      {...field}
                      className=' text-xl'
                      icon={<Icon name='mail' className='h-8 w-8' />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pass'
              render={({ field }) => (
                <FormItem className='py-4'>
                  <FormLabel className='flex justify-start text-xl items-center'>
                    Password<span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Password'
                      {...field}
                      className=' text-base'
                      icon={<Icon name='eye' className='h-8 w-8' />}
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isRemeberChecked'
              render={({ field }) => (
                <FormItem className='py-4'>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id='loginRemember'
                      />
                      <FormLabel
                        htmlFor='loginRemember'
                        className='flex justify-start text-xl'
                      >
                        Remember me
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='pt-4'>
              <Button
                disabled={loginMutation.isPending || !form.formState.isValid}
                type='submit'
                className='w-full px-12 h-16 text-xl'
                size='sm'
              >
                Sign In
                {loginMutation.isPending && (
                  <Loader2 className='ml-2 animate-spin' />
                )}
              </Button>
            </div>
            <div className='flex justify-center items-center text-xl text-secondary-foreground  font-OpenSans mt-4'>
              <h3>Don't have an account?</h3>
              <Button asChild variant='link' className='px-2 text-blue'>
                <Link to='/signup' className='text-xl '>
                  Sign Up
                </Link>
              </Button>
            </div>
            <Button asChild variant='link' className='h-2 text-blue'>
              <Link to='/reset-password' className='text-xl   font-OpenSans'>
                Forgot Password
              </Link>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
