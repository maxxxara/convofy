import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  Bot,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Zap,
  Users,
  MessageSquare,
  Github,
  Chrome,
  User,
  Check,
  X,
  Star,
} from "lucide-react";
import { trpc } from "@/utils/trpc";
import { TRPCClientError } from "@trpc/client";
import type { TrpcClientError } from "@/utils/types";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Chatbots",
    description: "Create intelligent conversational AI for your business",
  },
  {
    icon: Zap,
    title: "Lightning Fast Setup",
    description: "Deploy your chatbot in minutes, not hours",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with your team on chatbot projects",
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Support",
    description: "Deploy across websites, Telegram, and more",
  },
];
export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isTermsAccepted: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { mutateAsync: handleSignUp } = trpc.auth.register.useMutation();

  const benefits = [
    "Free 14-day trial with full access",
    "No credit card required",
    "Cancel anytime",
    "24/7 customer support",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    await handleSignUp({
      name: formData.firstName,
      surname: formData.lastName,
      email: formData.email,
      password: formData.password,
    })
      .then((res) => {
        localStorage.setItem("token", res.token);
        navigate("/");
      })
      .catch((err: TrpcClientError) => {
        console.log("Error: ", err);

        // Clear previous errors
        setError(null);
        setFieldErrors({});

        try {
          // Parse validation errors from the error message
          const errorData = JSON.parse(err.message);
          if (Array.isArray(errorData)) {
            const newFieldErrors: Record<string, string> = {};

            errorData.forEach((validationError: any) => {
              if (validationError.path && validationError.path.length > 0) {
                const fieldName = validationError.path[0];
                // Map backend field names to frontend field names
                const fieldMapping: Record<string, string> = {
                  name: "firstName",
                  surname: "lastName",
                  email: "email",
                  password: "password",
                };
                const frontendFieldName = fieldMapping[fieldName] || fieldName;
                newFieldErrors[frontendFieldName] = validationError.message;
              }
            });

            setFieldErrors(newFieldErrors);

            // Set a general error message if no specific field errors
            if (Object.keys(newFieldErrors).length === 0) {
              setError("Please check your input and try again");
            }
          } else {
            setError(err.message || "An error occurred during sign up");
          }
        } catch (parseError) {
          // If we can't parse the error, show the original message
          setError(err.message || "An error occurred during sign up");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between">
        {/* Logo & Brand */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Convofy</h1>
              <p className="text-sm text-slate-600">RAG Chatbot Platform</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Start building the future of customer engagement
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Join thousands of businesses using Convofy to create intelligent
              chatbots that transform customer conversations.
            </p>

            {/* Benefits List */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm"
                >
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Enterprise-grade security & privacy</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs">
              SOC 2 Compliant
            </Badge>
            <Badge variant="outline" className="text-xs">
              GDPR Ready
            </Badge>
            <Badge variant="outline" className="text-xs">
              99.9% Uptime
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-slate-600">
              4.9/5 from 2,000+ reviews
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Convofy</h1>
              <p className="text-xs text-slate-600">RAG Chatbot Platform</p>
            </div>
          </div>

          <Card className="border-slate-200 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl text-slate-900">
                Create your free account
              </CardTitle>
              <CardDescription className="text-slate-600">
                Start your 14-day free trial today. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Sign Up */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-11 border-slate-200 hover:bg-slate-50"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 border-slate-200 hover:bg-slate-50"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Sign Up Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-slate-700 font-medium"
                    >
                      First name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`pl-10 h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white ${
                          fieldErrors.firstName
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : ""
                        }`}
                      />
                    </div>
                    {fieldErrors.firstName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <X className="w-3 h-3" />
                        {fieldErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-slate-700 font-medium"
                    >
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={`h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white ${
                        fieldErrors.lastName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                    />
                    {fieldErrors.lastName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <X className="w-3 h-3" />
                        {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`pl-10 h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white ${
                        fieldErrors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <X className="w-3 h-3" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-slate-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`pl-10 pr-10 h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white ${
                        fieldErrors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <X className="w-3 h-3" />
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-slate-700 font-medium"
                  >
                    Confirm password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10 pr-10 h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Terms & Privacy */}
                <div className="flex items-start space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                    checked={formData.isTermsAccepted}
                    onChange={(e) =>
                      handleInputChange("isTermsAccepted", e.target.checked)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-slate-600 leading-relaxed"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {error && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {error}
                  </p>
                )}

                <Button className="w-full h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                  Create free account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>

              {/* Help Text */}
              <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md">
                <Shield className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <p>
                  Your data is protected with enterprise-grade security. We
                  never share your information with third parties.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Benefits */}
          <div className="lg:hidden mt-6 space-y-3">
            {benefits.slice(0, 2).map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 text-xs text-slate-600"
              >
                <Check className="w-3 h-3 text-green-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
