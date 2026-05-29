import { useState, type ChangeEvent, type FormEvent } from "react";
import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiError, apiClient } from "@/lib/api";
import { cn } from "@/lib/utils";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
};

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

type ContactSuccessResponse = {
  status: "success";
  message: string;
  data: {
    id: string;
    createdAt: string;
  };
};

type ContactErrorResponse = {
  status: "error";
  message?: string;
  errors?: string[];
};

const INITIAL_FORM_STATE: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  phone: "",
};

const CONTACT_ENDPOINTS = ["/api/v1/contact", "/api/contact"] as const;

const ContactUs = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (values: ContactFormState) => {
    const errors: Partial<Record<keyof ContactFormState, string>> = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const subject = values.subject.trim();
    const message = values.message.trim();
    const phone = values.phone.trim();

    if (name.length < 2 || name.length > 40) {
      errors.name = "Name must be between 2 and 40 characters.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (email.length > 80) {
      errors.email = "Email must be 80 characters or less.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (subject.length < 2 || subject.length > 120) {
      errors.subject = "Subject must be between 2 and 120 characters.";
    }

    if (message.length < 10 || message.length > 2000) {
      errors.message = "Message must be between 10 and 2000 characters.";
    }

    if (phone && !/^[0-9+\s().-]+$/.test(phone)) {
      errors.phone = "Phone can include digits, spaces, +, (, ), -, and .";
    }

    return errors;
  };

  const submitContact = async (payload: ContactPayload) => {
    let lastError: ApiError | null = null;

    for (const endpoint of CONTACT_ENDPOINTS) {
      try {
        return await apiClient.post<ContactSuccessResponse>(endpoint, payload);
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 404 || error.status === 405) {
            lastError = error;
            continue;
          }
        }

        throw error;
      }
    }

    throw lastError ?? new ApiError("Contact service unavailable", 0);
  };

  const handleFieldChange =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setFormState((prev) => ({ ...prev, [field]: value }));
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    const payload: ContactPayload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      subject: formState.subject.trim(),
      message: formState.message.trim(),
      phone: formState.phone.trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      await submitContact(payload);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormState(INITIAL_FORM_STATE);
      setFormErrors({});
    } catch (error) {
      let description = "Please try again in a moment.";

      if (error instanceof ApiError) {
        const details = error.details as ContactErrorResponse | undefined;
        const errorMessages = Array.isArray(details?.errors) ? details?.errors : undefined;
        if (errorMessages?.length) {
          description = errorMessages.join(" ");
        } else if (details?.message) {
          description = details.message;
        } else if (error.message) {
          description = error.message;
        }
      }

      toast({
        title: "Unable to send message",
        description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-8">Get in touch with our team</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          autoComplete="name"
                          maxLength={40}
                          minLength={2}
                          value={formState.name}
                          onChange={handleFieldChange("name")}
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? "name-error" : undefined}
                          className={cn(formErrors.name && "border-destructive focus-visible:ring-destructive")}
                          required
                        />
                        {formErrors.name ? (
                          <p id="name-error" className="text-sm text-destructive">
                            {formErrors.name}
                          </p>
                        ) : null}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          autoComplete="email"
                          maxLength={80}
                          value={formState.email}
                          onChange={handleFieldChange("email")}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? "email-error" : undefined}
                          className={cn(formErrors.email && "border-destructive focus-visible:ring-destructive")}
                          required
                        />
                        {formErrors.email ? (
                          <p id="email-error" className="text-sm text-destructive">
                            {formErrors.email}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Partnership inquiry"
                        maxLength={120}
                        minLength={2}
                        value={formState.subject}
                        onChange={handleFieldChange("subject")}
                        aria-invalid={!!formErrors.subject}
                        aria-describedby={formErrors.subject ? "subject-error" : undefined}
                        className={cn(formErrors.subject && "border-destructive focus-visible:ring-destructive")}
                        required
                      />
                      {formErrors.subject ? (
                        <p id="subject-error" className="text-sm text-destructive">
                          {formErrors.subject}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                        maxLength={12}
                        value={formState.phone}
                        onChange={handleFieldChange("phone")}
                        aria-invalid={!!formErrors.phone}
                        aria-describedby={formErrors.phone ? "phone-error" : undefined}
                        className={cn(formErrors.phone && "border-destructive focus-visible:ring-destructive")}
                      />
                      {formErrors.phone ? (
                        <p id="phone-error" className="text-sm text-destructive">
                          {formErrors.phone}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        maxLength={2000}
                        minLength={10}
                        value={formState.message}
                        onChange={handleFieldChange("message")}
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? "message-error" : undefined}
                        className={cn(formErrors.message && "border-destructive focus-visible:ring-destructive")}
                        required
                      />
                      {formErrors.message ? (
                        <p id="message-error" className="text-sm text-destructive">
                          {formErrors.message}
                        </p>
                      ) : null}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    123 Gaming Street<br />
                    San Francisco, CA 94102<br />
                    United States
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Mail className="w-6 h-6 text-primary mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    support@playarena.com<br />
                    business@playarena.com
                  </p>
                </CardContent>
              </Card>

              {/* <Card>
                <CardHeader>
                  <Phone className="w-6 h-6 text-primary mb-2" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    +1 (555) 123-4567<br />
                    Mon-Fri: 9am - 6pm PST
                  </p>
                </CardContent>
              </Card> */}

              <Card>
                <CardHeader>
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default ContactUs;
