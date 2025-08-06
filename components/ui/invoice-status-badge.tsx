import { Badge } from "./badge";
import { InvoiceStatus } from "@/lib/api";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

export function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const getStatusConfig = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return {
          variant: "default" as const,
          className: "bg-green-500",
          text: "Paid"
        };
      case "overdue":
        return {
          variant: "destructive" as const,
          className: "",
          text: "Overdue"
        };
      case "due":
        return {
          variant: "outline" as const,
          className: "",
          text: "Due"
        };
      default:
        return {
          variant: "secondary" as const,
          className: "",
          text: "Unknown"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} ${className || ""}`}
    >
      {config.text}
    </Badge>
  );
} 