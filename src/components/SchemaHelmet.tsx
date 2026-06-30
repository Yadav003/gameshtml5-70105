import { useEffect } from "react";
import { injectSchema } from "@/lib/schema";

interface SchemaHelmetProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export const SchemaHelmet = ({ schema }: SchemaHelmetProps) => {
  useEffect(() => {
    const payload = Array.isArray(schema) ? schema : [schema];
    injectSchema(payload.length === 1 ? payload[0] : payload);
  }, [schema]);

  return null;
};
