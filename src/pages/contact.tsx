import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Outlet } from "react-router";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBranches } from "@/contexts/BranchesContext";

import Map from "../components/Map";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(4, "Message is too short"),
});

function Contact() {
  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  const { branches, currentBranch, isDisplayDetails, displayWholeBranches } = useBranches();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();
  };

  return (
    <div className="text-foreground">
      {/* Hero Section */}
      <section className="relative mb-0 h-[50vh] w-full overflow-hidden md:h-[60vh]">
        <div className="bg-background/80 absolute inset-0 z-10"></div>
        <img src="/Conus.png" alt="Contact Banner" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative z-20 container mx-auto flex h-full flex-col items-start justify-center px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Contact Us</h1>
            <p className="mb-8 text-lg md:text-xl">
              We’re here to help with any questions about our meals and services.
            </p>
          </div>
        </div>
      </section>

      {/* Info + Form Section */}
      <div className="bg-muted mb-0 py-12">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left – Info */}
          <div className="text-neutral flex flex-col">
            <h2 className="from-primary to-accent text-sidebar-foreground my-3 bg-gradient-to-r bg-clip-text text-[30px] font-bold">
              Information
            </h2>
            <div className="mb-5 max-w-md text-[18px] leading-relaxed">
              <p className="mb-4">
                We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free
                to reach out. You can contact us using the form below, or reach us directly at:
              </p>
              <a className="hover:text-primary mb-3 block flex items-center gap-2" href="mailto:iti@support.com">
                <Mail size={18} /> iti@support.com
              </a>
              <a className="hover:text-primary mb-3 block flex items-center gap-2" href="tel:+202584567890">
                <Phone size={18} /> +20 258-456-7890
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-4 flex gap-4">
              {[Twitter, Facebook, Instagram].map((Icon, idx) => (
                <button
                  type="button"
                  key={idx}
                  className="bg-secondary border-secondary hover:bg-base-200 hover:text-primary rounded-full border-2 p-2 transition"
                  aria-label={`Social Media ${Icon.name}`}
                >
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>

          {/* Right – Contact Form */}
          <Form {...form}>
            <form className="space-y-6 text-base" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="text-[16px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} className="text-[16px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject" {...field} className="text-[16px]" />
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
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <textarea
                        rows={5}
                        placeholder="Write your message here..."
                        className="border-border bg-background text-foreground focus:ring-primary w-full resize-none rounded-md border p-3 text-[16px] focus:ring-2 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Send Button */}
              <Button type="submit" className="w-full py-6 text-lg text-[16px]">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Branches + Map Section */}
      <div className="bg-muted-foreground/10 py-12">
        <div className="container flex flex-col items-start gap-8 md:flex-row md:items-stretch">
          {/* Left – Branches or Detail */}
          <div className="w-full overflow-y-auto px-4 md:w-5/12">
            {isDisplayDetails ? (
              <Outlet />
            ) : (
              <>
                <h2
                  onClick={displayWholeBranches}
                  className="text-sidebar-foreground border-accent mb-6 cursor-pointer border-b-2 pb-2 text-center text-3xl font-bold"
                >
                  Our Branches
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {branches.map((branch, index) => (
                    <Link
                      to={`branch?lat=${branch.position.lat}&lng=${branch.position.lng}`}
                      key={index}
                      className={`border-border hover:bg-accent rounded-xl border p-4 text-center transition-colors duration-200 ${
                        branch.position.lat === currentBranch?.position.lat &&
                        branch.position.lng === currentBranch?.position.lng
                          ? "bg-accent/40 border-primary"
                          : "bg-muted"
                      } `}
                    >
                      <div className="text-lg font-semibold">{branch.cityName}</div>
                      <div className="text-muted-foreground text-sm">{branch.countryName}</div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right – Map */}
          <div className="relative h-[400px] w-full rounded-3xl md:h-[620px] md:w-7/12">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
