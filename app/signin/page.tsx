'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {SignInForm, signInSchema} from '@/types/schemas/signin-schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Field, FieldLabel} from '@/components/ui/field';
import {signIn} from 'next-auth/react';
import {appToast} from '@/components/shared/app-toast';
import {redirect} from 'next/navigation';

export default function SignInPage() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submit = async (data: SignInForm) => {
    const res = await signIn('credentials', {
      redirect: false,
      ...data,
    });

    if (!res?.ok) {
      appToast('Login failed', 'Login failed bro, try again');
      return;
    }

    appToast('Successfully logged', 'Welcome to media land');
    redirect('/');
  };

  return (
    <div className="w-full h-10/12 flex flex-col items-center justify-center">
      <Card className="w-6/12">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Username and password bro</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-login" onSubmit={form.handleSubmit(submit)}>
            <div className="flex flex-col gap-6">
              <Controller
                name="username"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                  </Field>
                )}
              ></Controller>
              <Controller
                name="password"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="password"
                    />
                  </Field>
                )}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="form-login">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
