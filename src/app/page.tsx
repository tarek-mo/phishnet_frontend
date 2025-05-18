import { EmailForm } from "@/components/email-form";
import EmailsTable from "@/components/emails-table";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col container mx-auto">
      <main className="flex-1">
        <section id="predict" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                PhishNet
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Paste the email text you received below and click submit to
                check if it&apos;s a phishing attempt.
              </p>
              <div className="w-full max-w-2xl">
                <EmailForm />
              </div>
            </div>
          </div>
        </section>

        <section id="history">
          <Suspense fallback={<p>Loading history...</p>}>
            <EmailsTable />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
