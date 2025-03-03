import React, { useEffect } from "react";
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
}

export default function MessageDialog({
  initialValues,
  mode,
}: MessageDialogProps) {
  const STAFF_ENDPOINT = "https://hameedah.pythonanywhere.com/api/admin/staff/";
  const NOTIFICATION_TEMPLATE =
    "https://hameedah.pythonanywhere.com/api/admin/notification-template/";

  const [open, setOpen] = React.useState(false);

  const defaultValues = React.useMemo(
    () => ({
      message: initialValues?.message ?? "",
    }),
    [initialValues]
  );

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { data, error, run, requestStatus } = useApiRequest({});

  useEffect(() => {
    const fetchData = async () => {
      run(
        getRequest({
          url: `${NOTIFICATION_TEMPLATE}${initialValues?.staff.id}/`,
        })
      );
    };

    fetchData();
  }, [initialValues?.staff.id, run]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, form, defaultValues]);

  useEffect(() => {
    const fetchDefaultMessage = async () => {
      try {
        const response = await getRequest({ url: "/api/default-message" });
        form.reset({ message: response.data.message }); // Update the form values
      } catch (error) {
        console.error("Failed to fetch default message", error);
      }
    };

    fetchDefaultMessage();
  }, [form]);

  const handleFormSubmit: SubmitHandler<{ message: string }> = async (
    message
  ) => {
    const updatedNotificationTemplate: NotificationTemplate = {
      staff: data.data.staff,
      message: message.message,
    };

    const id = updatedNotificationTemplate.staff.id;

    if (!id) {
      toast.error("Staff doesn't exist!");
      return;
    }

    try {
      await run(
        putRequest({
          url: `${NOTIFICATION_TEMPLATE}${id}/`,
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

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
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
          <DialogDescription>TBDDDDDDDDDDDDDDD</DialogDescription>
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
                        placeholder="Enter a customized birthday message!"
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
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
