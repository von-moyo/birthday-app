import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { NotificationTemplate } from "@/types";
import { useApiRequest } from "../../hooks";
import { putRequest, getRequest } from "@/api/requestProcessor";
import { PenLine } from "lucide-react";

const schema = yup.object().shape({
  message: yup.string().required("Your message is required"),
});

interface MessageDialogProps {
  initialValues?: NotificationTemplate;
  mode: "desktop" | "mobile";
  trigger?: React.ReactNode; // Make trigger optional
  open?: boolean; // Optional open prop for external control
  onOpenChange?: (open: boolean) => void; // Optional callback for external control
}

export default function MessageDialog({
  initialValues,
  mode,
  trigger,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: MessageDialogProps) {
  const STAFF_ENDPOINT = "https://hameedah.pythonanywhere.com/api/admin/staff/";
  const NOTIFICATION_TEMPLATE =
    "https://hameedah.pythonanywhere.com/api/admin/notification-template/";

  // Use external control if provided, otherwise use internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const [message, setMessage] = useState(initialValues?.message ?? "");

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { message },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { error, run, requestStatus } = useApiRequest({});

  useEffect(() => {
    if (!open || !initialValues?.staff.id) return;

    const fetchMessage = async () => {
      try {
        const response = await getRequest({
          url: `${NOTIFICATION_TEMPLATE}${initialValues.staff.id}/`,
        });
        setMessage(response.data.message);
        form.reset({ message: response.data.message });
      } catch (error) {
        console.error("Failed to fetch message:", error);
      }
    };

    fetchMessage();
  }, [open, initialValues?.staff.id, form]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleFormSubmit: SubmitHandler<{ message: string }> = async ({
    message,
  }) => {
    if (!initialValues?.staff?.id) {
      toast.error("Staff doesn't exist!");
      return;
    }

    const updatedNotificationTemplate: NotificationTemplate = {
      staff: initialValues?.staff,
      message,
    };

    try {
      await run(
        putRequest({
          url: `${NOTIFICATION_TEMPLATE}${updatedNotificationTemplate.staff.id}/`,
          data: updatedNotificationTemplate,
        })
      );

      await run(getRequest({ url: `${STAFF_ENDPOINT}?format=json` }));
      toast.success("Customized successfully!");

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Customize Message error: ", error);
      toast.error("Failed to customize message data");
    }
  };

  return (
    <>
      {trigger ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {mode === "desktop" ? (
              <button
                type="button"
                className="flex items-center gap-x-1 cursor-pointer pointer-events-auto"
                title="Customize Message"
              >
                <PenLine className="size-4 pointer-events-auto" />
                <span className="hidden 2xl:block">Customize Message</span>
              </button>
            ) : (
              <button
                type="button"
                className="flex items-center gap-x-2 w-full cursor-[inherit] pointer-events-[inherit]"
                title="Customize Message"
              >
                <PenLine className="size-4 pointer-events-auto" />
                <span>Customize Message</span>
              </button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[640px] bg-white">
            <DialogHeader>
              <DialogTitle>Customize Message</DialogTitle>
              <DialogDescription>
                Customize the birthday message for this staff member
              </DialogDescription>
            </DialogHeader>
            {requestStatus.isPending ? (
              <div>Loading ...</div>
            ) : requestStatus.isRejected ? (
              <div>Error: {error?.message || "Failed to fetch data"}</div>
            ) : (
              <Form {...form}>
                <form className="z-50 grid gap-4 p-4 max-h-[60vh] overflow-y-auto">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={
                              message || "Enter a customized birthday message!"
                            }
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
            <DialogFooter className="flex items-center gap-x-4">
              <Button
                type="submit"
                variant="outline"
                className="hover:cursor-pointer"
                onClick={form.handleSubmit(handleFormSubmit)}
              >
                Submit
              </Button>
              <Button
                type="button"
                className="bg-red-700 text-white hover:cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Customize Message</DialogTitle>
            <DialogDescription>
              Customize the birthday message for this staff member
            </DialogDescription>
          </DialogHeader>
          {requestStatus.isPending ? (
            <div>Loading ...</div>
          ) : requestStatus.isRejected ? (
            <div>Error: {error?.message || "Failed to fetch data"}</div>
          ) : (
            <Form {...form}>
              <form className="z-50 grid gap-4 p-4 max-h-[60vh] overflow-y-auto">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            message || "Enter a customized birthday message!"
                          }
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
          <DialogFooter className="flex items-center gap-x-4">
            <Button
              type="submit"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={form.handleSubmit(handleFormSubmit)}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-red-700 text-white hover:cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </>
      )}
    </>
  );
}
