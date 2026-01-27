"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    //*  we can pass this error to a logger
    console.log(error);
  }, []);
  return (
    <div>
      <h1> 404 not found</h1>
      <Button onClick={() => reset()}>Retry</Button>
    </div>
  );
};

export default error;
