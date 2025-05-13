import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export enum FormResult {
  NOT_SUBMITTED = "NOT_SUBMITTED",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export const useFormResult = () => {
  const params = useSearchParams();
  const responseStatus = params.get("response_status");

  useEffect(() => {
    /* strip the result search param */
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("response_status");
    url.search = params.toString();
    window.history.replaceState({}, "", url.toString());
  }, []);

  return useState(() => {
    switch (responseStatus) {
      case null:
        return FormResult.NOT_SUBMITTED;
      case "200":
        return FormResult.SUCCESS;
      default:
        return FormResult.ERROR;
    }
  });
};
