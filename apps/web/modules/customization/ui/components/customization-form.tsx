import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Textarea } from "@workspace/ui/components/textarea";
import { Separator } from "@workspace/ui/components/separator";

export const widgetSettingsSchema = z.object({
  greetMessage: z.string().min(1, "Greeting message is required"),
  defaultSuggestions: z.object({
    suggestion1: z.string().optional(),
    suggestion2: z.string().optional(),
    suggestion3: z.string().optional(),
  }),
})

type WidgetSettings = Doc<"widgetSettings">;
type FormSchema = z.infer<typeof widgetSettingsSchema>;

interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
};

export const CustomizationForm = ({
  initialData,
}: CustomizationFormProps) => {
  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);

  const form = useForm<FormSchema>({
    resolver: zodResolver(widgetSettingsSchema as any),
    defaultValues: {
      greetMessage:
        initialData?.greetMessage || "Hi! How can I help you today?",
      defaultSuggestions: {
        suggestion1: initialData?.defaultSuggestions.suggestion1 || "",
        suggestion2: initialData?.defaultSuggestions.suggestion2 || "",
        suggestion3: initialData?.defaultSuggestions.suggestion3 || "",
      },
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      await upsertWidgetSettings({
        greetMessage: values.greetMessage,
        defaultSuggestions: values.defaultSuggestions,
      });
      toast.success("Widget settings saved");
    } catch(error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>General Chat Settings</CardTitle>
          <CardDescription>
            Configure basic chat widget behavior and messages
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Field>
            <FieldLabel>Greeting Message</FieldLabel>

            <Textarea
              {...form.register("greetMessage")}
              placeholder="Welcome message shown when chat open"
              rows={3}
            />

            <FieldDescription>
              The first message customers see when they open the chat
            </FieldDescription>

            <FieldError
              errors={[
                form.formState.errors.greetMessage
                  ? { message: form.formState.errors.greetMessage.message }
                  : undefined,
              ]}
            />
          </Field>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="mb-4 text-sm">Default Suggestions</h3>

              <p className="mb-4 text-sm text-muted-foreground">
                Quick reply suggestions shown to customers to help guide the
                conversation
              </p>

              <div className="space-y-4">
                <Field>
                  <FieldLabel>Suggestion 1</FieldLabel>

                  <Input
                    {...form.register("defaultSuggestions.suggestion1")}
                    placeholder="e.g., How do I get started?"
                  />

                  <FieldError
                    errors={[
                      form.formState.errors.defaultSuggestions?.suggestion1
                        ? {
                            message:
                              form.formState.errors.defaultSuggestions
                                .suggestion1.message,
                          }
                        : undefined,
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel>Suggestion 2</FieldLabel>

                  <Input
                    {...form.register("defaultSuggestions.suggestion2")}
                    placeholder="e.g., What are your pricing plans?"
                  />

                  <FieldError
                    errors={[
                      form.formState.errors.defaultSuggestions?.suggestion2
                        ? {
                            message:
                              form.formState.errors.defaultSuggestions
                                .suggestion2.message,
                          }
                        : undefined,
                    ]}
                  />
                </Field>

                <Field>
                  <FieldLabel>Suggestion 3</FieldLabel>

                  <Input
                    {...form.register("defaultSuggestions.suggestion3")}
                    placeholder="e.g., I need help with my account"
                  />

                  <FieldError
                    errors={[
                      form.formState.errors.defaultSuggestions?.suggestion3
                        ? {
                            message:
                              form.formState.errors.defaultSuggestions
                                .suggestion3.message,
                          }
                        : undefined,
                    ]}
                  />
                </Field>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button disabled={form.formState.isSubmitting} type="submit">
          Save Settings
        </Button>
      </div>
    </form>
  );
};
