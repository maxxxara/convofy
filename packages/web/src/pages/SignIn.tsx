import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              Welcome back to the future of customer engagement
            </h2>
            <p className="text-lg text-slate-600">
              Sign in to continue building intelligent chatbots that transform
              your business conversations.
            </p>
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
        </div>
      </div>

      {/* Right Side - Sign In Form */}
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
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-slate-600">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Sign In */}
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

              {/* Email & Password Form */}
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
                    />
                  </div>
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-slate-600"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button className="w-full h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                  Sign in to dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create your free account
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

          {/* Mobile Trust Indicators */}
          <div className="lg:hidden mt-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
              <Shield className="w-3 h-3 text-green-600" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="text-xs">
                SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                99.9% Uptime
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
