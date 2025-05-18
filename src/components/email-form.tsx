"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
const defaultEmail = `Dear Customer,
We have detected unusual activity on your account. Please verify your information by clicking the link below:

https://secure-account-verification.com

If you do not verify within 24 hours, your account will be suspended.

Thank you,
Security Team`;

type Result = {
  confidence: string;
  prediction: string;
};
export function EmailForm() {
  const [email, setEmail] = useState(defaultEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await api.post("/predict", {
        email_text: email,
      });
      const data = response.data as Result;
      setResult(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              className="min-h-[200px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "Checking Email..." : "Check Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4 mt-6">
        {result && (
          <>
            {result.prediction === "Phishing Email" ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Phishing Detected</AlertTitle>
                <AlertDescription className="">
                  <p className="">Email is phishing: Yes</p>
                  <p>Confidence Percent: {result.confidence}</p>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-green-50 text-green-800 border-green-500">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Safe Email</AlertTitle>
                <AlertDescription>
                  <p>Email is phishing: No</p>
                  <p>Confidence Percent: {result.confidence}</p>
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </div>
    </>
  );
}
