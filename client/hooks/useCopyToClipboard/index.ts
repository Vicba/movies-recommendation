import { useState } from "react";

function copyToClipboard(text: string, options?: any): boolean {
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

export default function useCopyToClipboard() {
  const [value, setValue] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleCopyToClipboard = (text: string, options?: any) => {
    const result = copyToClipboard(text, options);
    if (result) setValue(text);
    setSuccess(result);
  };

  return [handleCopyToClipboard, { value, success }] as const;
}
