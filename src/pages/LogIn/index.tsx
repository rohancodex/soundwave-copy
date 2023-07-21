import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { z } from "zod"; // Import zod
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./helper";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


type FormSchemaType = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: FormSchemaType) => {
    try {
      // Validate form data against the schema
      const { username } = data;
      const expirationTime = 20 * 60 * 1000
      Cookies.set("authUser", username, {
        expires: new Date(Date.now() + expirationTime),
      });
      navigate(0);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex items-center justify-center"
    >
      <Card className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center mx-4 my-4">
        <CardContent className="px-4 md:px-8 md:flex md:items-center md:gap-8">
          <div className="md:w-1/2">
            <CardTitle>
              Experience the Soundwave platform by signing in!
            </CardTitle>
            <div className="flex flex-col my-10">
              <Controller
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    className="rounded-xl border"
                    {...field}
                    autoComplete="username"
                    placeholder="User Name"
                    error={errors?.username?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    className="rounded-xl border mt-8"
                    {...field}
                    autoComplete="current-password"
                    placeholder="Password"
                    type="password"
                    error={errors?.password?.message}
                  />
                )}
              />
            </div>

            <Button type="submit">Login</Button>
          </div>

          {/* <!-- image --> */}
          <div className="hidden md:block">
            <img
              className="rounded-2xl"
              src="https://images.pexels.com/photos/13244401/pexels-photo-13244401.jpeg?auto=compress&cs=tinysrgb&w=400"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Login;
