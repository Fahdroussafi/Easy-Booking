import React from "react";

function EmailSent() {
  const email = localStorage.getItem("email");
  return (
    <div className="from-gray-50 to-blue-500 bg-gradient-to-r h-screen flex items-center justify-center p-12 py-6">
      <div className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-10 rounded-full">
        <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-20">
          <div className="flex justify-center md:justify-end">
            <img
              className="w-full max-w-sm"
              src="https://ouch-cdn2.icons8.com/sKnF2PmYhkmP28DzIm6KqWSknT03UVWjg3FLlGYIOp4/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTI3/L2U4OWQ2NmZiLTg0/NzEtNDc3NS1hNTA0/LTMwNWRiYmJkNzg0/MC5zdmc.png"
              alt="Marketing newsletter via computer Illustration in PNG, SVG"
            />
          </div>
          <div className="flex items-center">
            <div className="mx-auto md:mx-0">
              <h3 className="text-3xl font-bold text-white">
                Email Sent Successfully to {email}
              </h3>
              <p className="mt-2 max-w-[20rem] text-lg text-white/80">
                Check your email for a link to reset your password. If it
                doesn’t appear within a few minutes, check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSent;
