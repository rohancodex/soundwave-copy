import * as React from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    return (
      <>
        <input
          type={showPassword ? "text" : type}
          className={cn(
            `flex h-10 w-full rounded-md bg-background px-3 py-2   text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background ${
              error
                ? "border-destructive text-destructive focus:border-destructive focus:ring-destructive focus-visible:"
                : "focus-visible:ring-2"
            } `,
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          <div className="relative">
            <div className="absolute right-3 -top-8">
              {showPassword ? (
                <EyeOff onClick={togglePasswordVisibility} />
              ) : (
                <Eye onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>
        ) : null}
        {error ? (
          <span className="text-destructive px-2 text-xs">{error}</span>
        ) : null}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
